var _ = require('lodash');
var UserStory = require('../models/user-story');
var Client = require('instagram-private-api').V1;
var Account = Client.Account;

exports.storiesByName = function (req, res) {
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
        .catch(function (error) {
            if (error instanceof Client.Exceptions.IGAccountNotFoundError) {
                res.status(404);
                res.send('Account not found');
            } else {
                console.error(error);
                res.status(500);
                res.send('Internal Server Error');
            }
        });
};
