var _ = require('lodash');
var Highlight = require('../models/highlight');
var Client = require('instagram-private-api').V1;
var Account = Client.Account;
var InstaError = require('../models/insta-error');

exports.highlightsByUserName = function (req, res) {
    var session = req.session;
    var username = typeof req.query.username === 'string' ? req.query.username : null;

    if (!username) {
        res.status(400);
        res.send('username is required');
        return;
    }

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
           return InstaError.toHttpResponse(error, res);
        })
};

exports.highlightById = function (req, res) {
    var session = req.session;
    var highlightId = req.params ? req.params.highlightId : null;

    Highlight.getDetail(session, highlightId)
        .then(res.send)
        .catch(function (error) {
           return InstaError.toHttpResponse(error, res);
        })
};
