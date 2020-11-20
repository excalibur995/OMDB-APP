
type MovieType = "movie" | "series" | "episode"

export interface IMovies {
    Title: string;
    Year: string;
    imdbID: string;
    Type: MovieType;
    Poster: string;
}

export interface MovieList {
    Search?: IMovies[];
    totalResults: number;
    Response: boolean;
}

export interface MovieListState {
    movies: MovieList;
    isLoading: false;
    search: string;
    isFocus: false;
}


export interface Props<P> {
    props: P
}

