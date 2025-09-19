export interface APIMoviesResponse {
    Search?: SearchMovie[] | null;
    totalResults: string;
    Response: string;
}
export interface SearchMovie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}
export interface Movie {
    id: string;
    title: string;
    year: string;
    type: string;
    poster: string;
}

export interface MoviesProps{
    movies: Movie[]
}