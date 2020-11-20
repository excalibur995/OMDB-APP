import { IMovies } from "../../../inteface/GeneralInterface.types";

export enum MoviesActionTypes {
    UPDATE_COUNT,
    GET_MOVIE_BY_ID,
    TOGGLE_LOAD_ID,
    GET_MOVIE_DATA
}

export interface SingleMovies {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: any[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

export interface MovieSingle {
    isLoad: boolean;
    Movies: Partial<SingleMovies>;
    count: number;
    detailed: Partial<IMovies>
}

export interface MoviesSection<P> {
    type: MoviesActionTypesUnion,
    payload: P
}

export type MovieActionTypes<T> = MoviesSection<T>

export type MoviesActionTypesUnion = keyof typeof MoviesActionTypes;