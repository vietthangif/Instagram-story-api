var _ = require('lodash');
var UserStory = require('../models/user-story');

exports.storiesByName = function (req, res) {
    var session = req.session;
    (new UserStory(session, [181191101])).get()
        .then(function (medias) {
            res.send(_.map(medias, function (media) {
                return media.getParams();
            }));
        })
        .catch(function (error) {
            console.error(error);
            res.status(500);
            res.send('Internal Server Error');
        });
};
