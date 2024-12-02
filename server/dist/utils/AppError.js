"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
// Wrapper class over the error class to accomodate for API needs.
class AppError extends Error {
    statusCode;
    status;
    operational;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode.toString().startsWith("2") ? "success" : "fail";
        this.operational = true;
        // The code below is used to instanceof can be used with this class.
        // The babel transpiler has issues when converting ES6 classes to older versions casing `instanceof` to not recognize their class. To handle we have to manually set the prototype of this class as `Error` (accessed through `AppError.prototype` which strangely works)
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
//# sourceMappingURL=AppError.js.map