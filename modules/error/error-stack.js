const InstaCookieError = require("./insta-cookie-error");
const InstaCommonError = require("./insta-common-error");

function stack(err, req, res, next) {
    var handled = !req.noRequestNewCookie && InstaCookieError.handleErrorResponse(err, req, res, function () {
        req.noRequestNewCookie = true;
        next(req, res);
    });

    if (handled) {
        return;
    }

    return InstaCommonError.hanleErrorResponse(err, res);
}

exports.stack = stack;
