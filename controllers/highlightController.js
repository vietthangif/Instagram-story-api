var _ = require('lodash');
var Highlight = require('../models/highlight');
var Client = require('instagram-private-api').V1;
var Account = Client.Account;

exports.highlightsByUserName = function (req, res) {
    var session = req.session;
    var username = typeof req.query.username === 'string' ? req.query.username : null;

    Account.searchForUser(session, username)
        .then(function (account) {
            return (new Highlight(session, account.id)).get()
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
        })
};

exports.highlightById = function (req, res) {
    var session = req.session;
    var highlightId = req.params ? req.params.highlightId : null;

    Highlight.getDetail(session, highlightId)
        .then(function (highlight) {
            res.send(highlight);
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
