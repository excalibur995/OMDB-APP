
export enum SearchActionTypes {
    SEARCH_MOVIE,
    GET_MOVIE,
    TOOGLE,
    LOADTOGGLE,
    EMPTY_MOVIE
}


export interface MoviesAction<P> {
    type: SearchActionTypesUnion,
    payload: P
}

export type MovieActionTypes<T> = MoviesAction<T>

export type SearchActionTypesUnion = keyof typeof SearchActionTypes;