var _ = require('lodash');
var UserStory = require('../models/user-story');
var Client = require('instagram-private-api').V1;
var Account = Client.Account;
var ErrorStack = require('../modules/error/error-stack');

function storiesByName(req, res) {
    var session = req.session;
    var username = typeof req.query.username === 'string' ? req.query.username : null;

    if (!username) {
        res.status(400);
        res.send('username is required');
        return;
    }

    Account.searchForUser(session, username)
        .then(function (account) {
            return (new UserStory(session, [account.id])).get()
        })
        .then(function (mediaList) {
            res.send(_.map(mediaList, function (media) {
                return media.getParams();
            }));
        })
        .catch(function (err) {
            ErrorStack.stack(err, req, res, storiesByName);
        });
}

exports.storiesByName = storiesByName;
