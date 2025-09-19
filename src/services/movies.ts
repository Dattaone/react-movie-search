import { APIMoviesResponse } from '../types/api'

const API_KEY = "925aef6a"

export async function getMovies(search: string){
    if(search === '') return []
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`)
        const movies: APIMoviesResponse = await response.json() 
        const mappedMovies = (movies.Search ?? []).map((movie) => ({
            id      : movie.imdbID,
            title   : movie.Title,
            year    : movie.Year,
            type    : movie.Type,
            poster  : movie.Poster
        }))
        return mappedMovies
    } catch (error) {
        throw new Error("Error searching movies")
    }

}
