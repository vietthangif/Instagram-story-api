var _ = require('lodash');
var Client = require('instagram-private-api').V1;
var Media = Client.Media;
var Request = Client.Request;

/**
 * Because current class user-story in lib parsing error so we need create new one
 *
 * @param session
 * @param userIds
 * @constructor
 */
function UserStory(session, userIds) {
    this.session = session;
    this.userIds = userIds.map(id => String(id));
}

UserStory.prototype.get = function () {
    var that = this;
    return new Request(that.session)
        .setMethod('POST')
        .setResource('userStory')
        .generateUUID()
        .setData({
            user_ids: this.userIds
        })
        .signPayload()
        .send()
        .then(function (data) {
            return _.map(data.reels[that.userIds].items, function (medium) {
                return new Media(that.session, medium);
            });
        });
};

module.exports = UserStory;
