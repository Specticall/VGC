import { Role } from "./permissions";

export type APIErrorResponse = {
  message: string;
  statusCode: number;
  status: string;
};

export type APISuccessResponse<T> = {
  message: string;
  statusCode: number;
  data: T;
};

export type ActorData = {
  CastId: string;
  Name: string;
  Image: string | null;
  Character: string;
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

export type CinemaData = {
  CinemaId: string;
  Contact: string;
  Location: string;
  Name: string;
};

export type MovieData = {
  MovieId: string;
  Title: string;
  Tagline: string;
  DurationMinutes: number;
  Price: string;
  Poster: string;
  Backdrop: string;
  Trailer: string | null;
  Status: string;
  AgeRestriction: string;
  ReleaseDate: string;
  VoteAverage: number;
  VoteCount: number;
  LanguageId: string;
  CreatedAt: string;
  UpdatedAt: string;
  casts: {
    CastId: string;
    MovieCastId: string;
    MovieId: string;
    cast: {
      Image: null | string;
      Name: string;
    };
  }[];
  language: {
    LanguageId: string;
    Name: string;
  };
  genres: {
    MovieGenreId: string;
    MovieId: string;
    GenreId: number;
    genre: GenreData;
  }[];
};

export type SearchHistory = {
  MovieId: string;
  UserId: string;
  CreatedAt: string;
  Query: string;
  SearchHistoryId: string;
};

export type SeatsData = {
  CinemaId: string;
  Name: string;
  Location: string;
  Contact: string;
  Schedules: Record<
    string,
    {
      RoomId: string;
      StartTime: string;
      EndTime: string;
      ScheduleId: string;
      Reservations: unknown[];
    }[]
  >;
};

export type GenreData = {
  GenreId: number;
  Name: string;
};

export type Language = {
  LanguageId: string;
  Name: string;
};

export type ScheduleData = {
  ScheduleId: string;
  StartTime: string;
  EndTime: string;
  RoomId: string;
  MovieId: string;
  CreatedAt: string;
  UpdatedAt: string;
  movie: {
    Title: string;
    Poster?: string;
    Tagline: string;
  };
  room: {
    Name: string;
    cinema: {
      Name: string;
    };
  };
  _count: {
    reservations: number;
  };
};

export type RoomData = {
  CinemaId: string;
  Name: string;
  RoomId: string;
  SeatCapacity: number;
};
