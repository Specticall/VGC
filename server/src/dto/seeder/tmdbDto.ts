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
  
}
