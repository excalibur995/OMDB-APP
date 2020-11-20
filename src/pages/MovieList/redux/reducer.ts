import { MovieSingle, MoviesSection } from "./types";

const initalState: MovieSingle = {
  Movies: {},
  count: 1,
  isLoad: false,
  detailed: {}
}



export const reducer = (state = initalState, action: MoviesSection<any>) => {
  switch (action.type) {

    case "GET_MOVIE_DATA":
      return {
        ...state,
        detailed: action.payload
      }

    case "GET_MOVIE_BY_ID":
      return {
        ...state,
        Movies: action.payload
      }
    case "TOGGLE_LOAD_ID":
      return {
        ...state,
        isLoad: action.payload
      }
    case "UPDATE_COUNT":
      return {
        ...state,
        count: action.payload
      }
    default:
      return state
  }
}