import { MovieList, MovieListState } from "../../../../inteface/GeneralInterface.types";
import { MovieActionTypes } from "./types";


const initialState: MovieListState = {
  isLoading: false,
  movies: {
    Response: false,
    totalResults: 0,
  },
  search: '',
  isFocus: false
}

function deDuplicate(origArr: MovieList, updatingArr: MovieList) {
  if (!origArr.Search) {
    return updatingArr
  }
  if (origArr.Search && updatingArr.Search) {
    const original = origArr.Search
    const updating = updatingArr.Search
    for (const iterator of updating) {
      original.push(iterator);
    }
    for (let i = 0, l = original.length; i < l; i++) {
      for (let j = 0, ll = updating.length; j < ll; j++) {
        if (original[i].imdbID === updating[j].imdbID) {
          original.splice(i, 1, updating[j]);
          break;
        }
      }
    }
  }
  return origArr
}


export const reducer = (state = initialState, action: MovieActionTypes<any>) => {
  switch (action.type) {

    case "TOOGLE":
      return {
        ...state,
        isFocus: action.payload
      }
    case "EMPTY_MOVIE":
      const initStateMovies: MovieList = {
        Response: false,
        totalResults: 0,
      }
      return {
        ...state,
        movies: initStateMovies
      }
    case "LOADTOGGLE":
      return {
        ...state,
        isLoading: action.payload
      }
    case "SEARCH_MOVIE":
      return {
        ...state,
        search: action.payload
      }
    case "GET_MOVIE":
      return {
        ...state,
        movies: deDuplicate(state.movies, action.payload)
      }
    default:
      return state
  }
}