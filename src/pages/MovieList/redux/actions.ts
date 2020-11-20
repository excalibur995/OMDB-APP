import axios from 'axios';
import { API_URL } from "../../../api";
import { IMovies } from '../../../inteface/GeneralInterface.types';
import { MoviesSection, SingleMovies } from "./types";

export function setCount(count: number): MoviesSection<number> {
    return {
        type: "UPDATE_COUNT",
        payload: count
    }
}

export function toggleLoadingId(load: boolean): MoviesSection<boolean> {
    return {
        type: "TOGGLE_LOAD_ID",
        payload: load
    }
}

export function getMovieByFromList(movies: IMovies): MoviesSection<IMovies> {
    return {
        type: "GET_MOVIE_DATA",
        payload: movies
    }
}

export function getMovieById(movies: SingleMovies): MoviesSection<SingleMovies> {
    return {
        type: "GET_MOVIE_BY_ID",
        payload: movies
    }
}

export function fetchMovieSingle(id: string) {
    return async (dispatch: (arg: MoviesSection<any>) => MoviesSection<any>) => {
        dispatch(toggleLoadingId(true))
        return axios.get(`${API_URL}&i=${id}`).then((response) => {
            dispatch(getMovieById(response.data))
            dispatch(toggleLoadingId(false))
        }).catch((reason) => {
            console.log(reason)
            dispatch(toggleLoadingId(false))
        });
    }

}