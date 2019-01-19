var config = require(appRoot + '/config');
var username = config.username;
var password = config.password;

var Client = require('instagram-private-api').V1;
var device = new Client.Device(username);

function loadOrRequestNewToken(req, res, next) {
    var storage = new Client.CookieFileStorage(appRoot + '/cookies.json');
    storage.getCookies()
        .then(function (cookies) {
            if (!cookies || cookies.length === 0) {
                loadNewSessionAndCookie(storage, req, res, next);
            } else {
                loadOldSessionAndCookie(storage, req, res, next)
            }
        })
        .catch(function (error) {
            //TODO check error before request new session and cookie
            console.error(error);
            loadNewSessionAndCookie(req, res, next);
        })
}

function loadOldSessionAndCookie(storage, req, res, next) {
    console.log('Cookie exists');
    req.session = new Client.Session(device, storage);
    next();
}

function loadNewSessionAndCookie(storage, req, res, next) {
    Client.Session.create(device, storage, username, password)
        .then(function (session) {
            console.log('Created cookie and session success');
            req.session = session;
            next();
        })
        .catch(function (error) {
            console.error(error);
            res.status(500);
            res.send('Internal server error');
        })
}

function destroy() {
    var storage = new Client.CookieFileStorage(appRoot + '/cookies.json');
    storage.destroy();
}

exports.loadOrRequestNewToken = loadOrRequestNewToken;
exports.destroy = destroy;
