var cookieHandler = require('../utils/cookieHandler');

/**
 * Middleware to get new cookie if it isn't exists or expired
 * @returns {Function}
 */
function instaCookieMiddleware() {
    return function (req, res, next) {
        cookieHandler.loadOrRequestNewToken(req, res, next);
    };
}

module.exports = instaCookieMiddleware;
