import { MoviesProps } from '../types/api'


function ListOfMovies({movies} : MoviesProps){
    return(
        <ul className='card-movie'>
            {
            movies?.map((movie) => (
                <li key={movie.id}>
                    <img src={movie.poster} alt={movie.title}/>
                    <h4>{movie.title}</h4>
                    <p>{movie.year}</p>
                </li>
            ))
            }
        </ul>
    )
    
}

export function Movies({movies} : MoviesProps) {
    const hasMovies = Array.isArray(movies) && movies.length > 0

  
    return hasMovies
      ? <ListOfMovies movies={movies} />
      : <h3>Aquí mostrarían las películas</h3>
  }
  