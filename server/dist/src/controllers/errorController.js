"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const utils_1 = require("../utils");
const specifyError = (error) => {
    if (error.message === "jwt expired") {
        return "Token has expired";
    }
    return "Something went very wrong!";
};
const errorHandler = async (error, request, response, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    if (error instanceof utils_1.AppError) {
        response.status(error.statusCode).send({
            status: error.status,
            statusCode: error.statusCode,
            message: error.message,
            stack: error.stack,
        });
        return;
    }
    response.status(500).send({
        status: "fail",
        statusCode: 500,
        message: specifyError(error),
        stack: error.stack,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorController.js.map