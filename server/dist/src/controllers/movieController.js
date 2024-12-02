"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getMovieById = exports.getMovies = void 0;
const utils_1 = require("@/utils");
const client_1 = require("@prisma/client");
const s3Controller_1 = require("./s3Controller");
const prisma = new client_1.PrismaClient();
const getMovies = async (req, res, next) => {
    try {
        const { id: userId } = req.body.payload;
        const { query, showing } = req.query;
        const buildWhereClause = () => {
            const clause = {};
            if (query) {
                clause.OR = [
                    {
                        Title: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        Tagline: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                ];
            }
            if (showing) {
                clause.Status = "NOW_SHOWING";
            }
            return clause;
        };
        const movies = await prisma.movie.findMany({
            include: {
                language: true,
                genres: {
                    include: {
                        genre: true,
                    },
                },
                casts: {
                    include: {
                        cast: true,
                    },
                },
                schedules: {
                    include: {
                        room: true,
                    },
                },
            },
            orderBy: {
                CreatedAt: "desc",
            },
            where: buildWhereClause(),
            take: query ? 10 : undefined,
        });
        let searchHistory;
        if (query) {
            searchHistory = await prisma.searchHistory.findMany({
                where: {
                    Query: {
                        contains: query,
                        mode: "insensitive",
                    },
                    UserId: userId,
                },
                orderBy: {
                    CreatedAt: "desc",
                },
                distinct: ["Query"],
                take: 4,
            });
        }
        if (!movies) {
            throw new utils_1.AppError("No movies found", utils_1.STATUS.NOT_FOUND);
        }
        return (0, utils_1.successRes)(res, query ? { movies, searchHistory } : movies);
    }
    catch (e) {
        next(e);
    }
};
exports.getMovies = getMovies;
const getMovieById = async (request, response, next) => {
    try {
        const { id } = request.params;
        if (!id) {
            throw new utils_1.AppError("id is missing the request parameter", utils_1.STATUS.BAD_REQUEST);
        }
        const movieData = await prisma.movie.findUnique({
            where: {
                MovieId: id,
            },
            include: {
                language: true,
                casts: {
                    include: {
                        cast: {
                            select: {
                                Image: true,
                                Name: true,
                            },
                        },
                    },
                },
                genres: {
                    include: {
                        genre: true,
                    },
                },
            },
        });
        if (!movieData) {
            throw new utils_1.AppError(`Movie with the id of ${id} was not found`, utils_1.STATUS.NOT_FOUND);
        }
        return (0, utils_1.successRes)(response, movieData);
    }
    catch (error) {
        next(error);
    }
};
exports.getMovieById = getMovieById;
const createMovie = async (req, res, next) => {
    try {
        const { title, tagline, durationMinutes, price, status, releaseDate, poster, backdrop, trailer, ageRestriction, genreIds, languageId, castIds, } = req.body;
        await prisma.movie.create({
            data: {
                Title: title,
                Tagline: tagline,
                DurationMinutes: durationMinutes,
                Price: price,
                Poster: poster,
                Backdrop: backdrop,
                Status: status,
                Trailer: trailer,
                AgeRestriction: ageRestriction,
                ReleaseDate: releaseDate,
                genres: {
                    create: genreIds.map((genreId) => ({
                        genre: {
                            connect: {
                                GenreId: genreId,
                            },
                        },
                    })),
                },
                language: {
                    connect: {
                        LanguageId: languageId,
                    },
                },
                casts: {
                    create: castIds.map((castId) => ({
                        cast: {
                            connect: {
                                CastId: castId,
                            },
                        },
                    })),
                },
            },
        });
        return (0, utils_1.successRes)(res, "Successfuly created movie");
    }
    catch (e) {
        next(e);
    }
};
exports.createMovie = createMovie;
const updateMovie = async (req, res, next) => {
    try {
        const { movieId } = req.params;
        const { title, tagline, durationMinutes, price, status, releaseDate, poster, backdrop, trailer, ageRestriction, genreIds, languageId, castIds, } = req.body;
        const movie = await prisma.movie.findUnique({
            where: {
                MovieId: movieId,
            },
        });
        if (movie?.Poster && movie.Poster !== poster) {
            (0, s3Controller_1.deleteFile)(movie.Poster);
        }
        if (movie?.Backdrop && movie.Backdrop !== backdrop) {
            (0, s3Controller_1.deleteFile)(movie.Backdrop);
        }
        if (movie?.Trailer && movie.Trailer !== trailer) {
            (0, s3Controller_1.deleteFile)(movie.Trailer);
        }
        await prisma.movie.update({
            where: {
                MovieId: movieId,
            },
            data: {
                Title: title,
                Tagline: tagline,
                DurationMinutes: durationMinutes,
                Price: price,
                Poster: poster,
                Backdrop: backdrop,
                Status: status,
                Trailer: trailer,
                AgeRestriction: ageRestriction,
                ReleaseDate: releaseDate,
                language: {
                    connect: {
                        LanguageId: languageId,
                    },
                },
                genres: {
                    deleteMany: {},
                    create: genreIds.map((genreId) => ({
                        genre: {
                            connect: {
                                GenreId: genreId,
                            },
                        },
                    })),
                },
                casts: {
                    deleteMany: {},
                    create: castIds.map((castId) => ({
                        cast: {
                            connect: {
                                CastId: castId,
                            },
                        },
                    })),
                },
            },
        });
        return (0, utils_1.successRes)(res, "Movie updated successfully");
    }
    catch (e) {
        next(e);
    }
};
exports.updateMovie = updateMovie;
const deleteMovie = async (req, res, next) => {
    try {
        const { movieId } = req.params;
        const movie = await prisma.movie.findUnique({
            where: {
                MovieId: movieId,
            },
        });
        if (movie?.Poster) {
            (0, s3Controller_1.deleteFile)(movie.Poster);
        }
        if (movie?.Backdrop) {
            (0, s3Controller_1.deleteFile)(movie.Backdrop);
        }
        if (movie?.Trailer) {
            (0, s3Controller_1.deleteFile)(movie.Trailer);
        }
        await prisma.movie.delete({
            where: {
                MovieId: movieId,
            },
        });
        return (0, utils_1.successRes)(res, "Movie deleted successfully");
    }
    catch (e) {
        next(e);
    }
};
exports.deleteMovie = deleteMovie;
//# sourceMappingURL=movieController.js.map