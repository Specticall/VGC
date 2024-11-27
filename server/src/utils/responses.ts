import { Response, NextFunction } from "express";

const HttpStatus = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

//success response
export const successRes = <T>(res: Response, data: T, message: string = "Success") => {
  return res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    message,
    data,
  });
};
//error response
const createError = (next: NextFunction, status: number, message: string | string[]) => {
  return next({
    status,
    message,
  });
};

export const errBadRequest = (next: NextFunction, message: string | string[] = "Bad Request") =>
  createError(next, HttpStatus.BAD_REQUEST, message);

export const errNotFound = (next: NextFunction, message: string = "Resource not found") =>
  createError(next, HttpStatus.NOT_FOUND, message);

export const errUnauthenticated = (next: NextFunction, message: string = "Please login first!") =>
  createError(next, HttpStatus.UNAUTHORIZED, message);

export const errUnauthorized = (next: NextFunction, message: string = "Access denied!") =>
  createError(next, HttpStatus.FORBIDDEN, message);

export const errInternalServer = (next: NextFunction, message: string = "Internal server error!") => 
  createError(next, HttpStatus.INTERNAL_SERVER_ERROR, message);