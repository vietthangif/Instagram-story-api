var Client = require('instagram-private-api').V1;

function InstaCommonError(error) {
    this.error = error;
}

InstaCommonError.prototype.toHttpResponse = function () {
    if (this.error instanceof Client.Exceptions.PrivateUserError) {
        return {
            code: 422,
            data: this.error
        }
    } else if (this.error instanceof Client.Exceptions.IGAccountNotFoundError) {
        return {
            code: 404,
            data: this.error
        }
    } else if (this.error instanceof Client.Exceptions.AccountInactive) {
        return {
            code: 422,
            data: this.error
        }
    } else if (this.error instanceof Client.Exceptions.AccountBanned) {
        return {
            code: 422,
            data: this.error
        }
    } else {
        console.error(this.error);
        return {
            code: 500
        }
    }
};

InstaCommonError.hanleErrorResponse = function (err, res) {
    var instaError = new InstaCommonError(err);
    var httpRes = instaError.toHttpResponse();
    res.status(httpRes.code);
    res.send(httpRes.data);
};

module.exports = InstaCommonError;
