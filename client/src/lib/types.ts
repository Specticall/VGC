import { Role } from "./permissions";

export type APISuccessResponse<T> = {
  message: string;
  statusCode: number;
  data: T;
};

export type UserData = {
  UserId: string;
  Name: string;
  Email: string;
  Password: string;
  ProfilePicture: string;
  Point: number;
  Age: number;
  CreatedAt: string;
  UpdatedAt: string;
  Role: Role;
};
