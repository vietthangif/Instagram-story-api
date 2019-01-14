var config = require(appRoot + '/config');
var username = config.username;
var password = config.password;

var Client = require('instagram-private-api').V1;
var device = new Client.Device(username);
var storage = new Client.CookieFileStorage(appRoot + '/cookies.json');

/**
 * Middleware to get new cookie if it isn't exists or expired
 * @returns {Function}
 */
function instaCookieMiddleware() {
    return function (req, res, next) {
        storage.getCookies()
            .then(function (cookies) {
                if (!cookies || cookies.length === 0) {
                    loadNewSessionAndCookie(req, res, next);
                } else {
                    loadOldSessionAndCookie(req, res, next)
                }
            })
            .catch(function (error) {
                //TODO check error before request new session and cookie
                console.error(error);
                loadNewSessionAndCookie(req, res, next);
            })
    };
}

function loadOldSessionAndCookie(req, res, next) {
    console.log('Cookie exists');
    req.session = new Client.Session(device, storage);
    next();
}

function loadNewSessionAndCookie(req, res, next) {
    Client.Session.create(device, storage, username, password)
        .then(function (session) {
            console.log('Created cookie and session success');
            req.session = session;
            next();
        })
        .catch(function (error) {
            //TODO log error to file
            console.error(error);
            res.status(500);
            res.send('Internal server error');
        })
}

module.exports = instaCookieMiddleware;
