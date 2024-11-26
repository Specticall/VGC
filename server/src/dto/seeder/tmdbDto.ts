export type TmdbMovieDetailDto = {
  genres: {
    id: number;
    name: string;
  }[];
  tagline?: string;
  runtime: number;
}

export type TmdbPopularMovieDto = {
  adult: boolean;
  backdrop_path?: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path?: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type TmdbCastDto = {
  id: number;
  name: string;
  original_name: string;
  profile_path?: string;
  character?: string;
}