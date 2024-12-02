"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errInternalServer = exports.errUnauthorized = exports.errUnauthenticated = exports.errNotFound = exports.errBadRequest = exports.successRes = void 0;
const HttpStatus = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};
//success response
const successRes = (res, data, message = "Success") => {
    return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message,
        data,
    });
};
exports.successRes = successRes;
//error response
const createError = (next, status, message) => {
    return next({
        status,
        message,
    });
};
const errBadRequest = (next, message = "Bad Request") => createError(next, HttpStatus.BAD_REQUEST, message);
exports.errBadRequest = errBadRequest;
const errNotFound = (next, message = "Resource not found") => createError(next, HttpStatus.NOT_FOUND, message);
exports.errNotFound = errNotFound;
const errUnauthenticated = (next, message = "Please login first!") => createError(next, HttpStatus.UNAUTHORIZED, message);
exports.errUnauthenticated = errUnauthenticated;
const errUnauthorized = (next, message = "Access denied!") => createError(next, HttpStatus.FORBIDDEN, message);
exports.errUnauthorized = errUnauthorized;
const errInternalServer = (next, message = "Internal server error!") => createError(next, HttpStatus.INTERNAL_SERVER_ERROR, message);
exports.errInternalServer = errInternalServer;
//# sourceMappingURL=responses.js.map