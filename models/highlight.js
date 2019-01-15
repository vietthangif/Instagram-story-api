var _ = require('lodash');
var Client = require('instagram-private-api').V1;
var Media = Client.Media;
var Request = Client.Request;

function Highlight(session, userId) {
    this.session = session;
    this.userId = userId
}

Highlight.prototype.get = function () {
    var that = this;
    var url = Client.CONSTANTS.API_ENDPOINT + 'highlights/' + this.userId + '/highlights_tray/';
    return new Request(that.session)
        .setMethod('GET')
        .setUrl(url)
        .send()
        .then(function (data) {
            if (!data.hasOwnProperty('tray')) {
                return [];
            }
            return _.map(data.tray, function (medium) {
                return new Media(that.session, medium);
            });
        });
};

Highlight.getDetail = function (session, highlightId) {
    return new Request(session)
        .setMethod('POST')
        .setResource('userStory')
        .generateUUID()
        .setData({
            user_ids: [highlightId]
        })
        .signPayload()
        .send()
        .then(function (data) {
            if (!data)
                throw new Client.Exceptions.IGAccountNotFoundError();

            if (!data.hasOwnProperty('reels')
                || !data.reels
                || !data.reels.hasOwnProperty(highlightId)) {
                return {};
            }

            return data.reels[highlightId];
        });
};

module.exports = Highlight;
