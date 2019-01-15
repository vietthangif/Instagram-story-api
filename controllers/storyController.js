var _ = require('lodash');
var UserStory = require('../models/user-story');
var Client = require('instagram-private-api').V1;
var Account = Client.Account;

exports.storiesByName = function (req, res) {
    var session = req.session;
    var username = req.params ? req.params.username : null;

    Account.searchForUser(session, username)
        .then(function (account) {
            return (new UserStory(session, [account.id])).get()
        })
        .then(function (medias) {
            res.send(_.map(medias, function (media) {
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
        })
};
