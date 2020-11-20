
import axios from 'axios'
import { API_URL } from '../../../../api'
import { MovieList } from '../../../../inteface/GeneralInterface.types'
import { MoviesAction } from './types'


export function setFocus(focus: boolean): MoviesAction<boolean> {
  return {
    type: "TOOGLE",
    payload: focus
  }
}


export function typeMovie(params: string): MoviesAction<string> {
  return {
    type: "SEARCH_MOVIE",
    payload: params
  }
}


export function getMovieList(search: MovieList): MoviesAction<MovieList> {
  return {
    type: "GET_MOVIE",
    payload: search
  }
}

export function ToggleLoading(params: boolean): MoviesAction<boolean> {
  return {
    type: "LOADTOGGLE",
    payload: params
  }
}

export function emptyMovie(): Pick<MoviesAction<any>, "type"> {
  return {
    type: "EMPTY_MOVIE",
  }
}

export function fetchMovie(title: string, page: number = 1) {
  return async (dispatch: (arg: MoviesAction<any>) => MoviesAction<any>) => {
    if (title.trim().length >= 3) {
      dispatch(ToggleLoading(true))
      return axios.get(`${API_URL}&s=${title}&page=${page}`).then((response) => {
        dispatch(getMovieList(response.data))
        dispatch(ToggleLoading(false))
      }).catch((reason) => {
        console.log(reason)
        dispatch(ToggleLoading(false))
      });
    }

  }
}
