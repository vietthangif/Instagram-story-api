var Client = require('instagram-private-api').V1;
var cookieHandler = require('../../utils/cookieHandler');

function InstaCookieError() {
}

InstaCookieError.handleErrorResponse = function (err, req, res, next) {
    if (err instanceof Client.Exceptions.CookieNotValidError) {
        cookieHandler.destroy();
        cookieHandler.loadOrRequestNewToken(req, res, function () {
            next(req, res, false);
        });
        return {};
    }
    return null;
};

module.exports = InstaCookieError;
