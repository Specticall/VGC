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

export type CinemaScheduleData = {
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

export type SeatsData = {
  SeatId: string;
  RoomId: string;
  Row: string;
  Number: number;
};

export type LocalCheckoutData = {
  cinemaId: string;
  seatsId: string[];
  scheduleId: string;
  movieId?: string;
  roomId?: string;
  startTime?: string;
  location?: string;
  selectedDate: string;
};

export type MidtransSuccess = {
  bca_va_number: string;
  finish_redirect_url: string;
  fraud_status: string;
  gross_amount: string;
  order_id: string;
  payment_type: string;
  pdf_url: string;
  status_code: string;
  status_message: string;
  transaction_id: string;
  transaction_status: string;
  transaction_time: string;
};
export type TicketData = {
  ReservationId: string;
  seats: {
    seat: {
      Number: number;
      Row: string;
    };
  }[];
  schedule: {
    StartTime: string;
    EndTime: string;
    room: {
      Name: string;
      cinema: {
        Name: string;
        Location: string;
      };
    };
    movie: {
      Title: string;
    };
  };
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
