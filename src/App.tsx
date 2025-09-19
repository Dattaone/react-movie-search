import { useState, useRef, useEffect, useCallback } from 'react'
import { Movies } from './components/Movies.tsx'
import { useMoviesResult } from './hooks/useMovies.ts'
import debounce from "just-debounce-it";

import './App.css'

function useSearch(){
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const isFirstInput = useRef(true)

   useEffect(()=>{
    if(isFirstInput.current){
      isFirstInput.current = search === ''
      return
    }
    if(search===''){
      setError("No se puede buscar una pelicula vacia")
      return
    }
    if(search.length<3){
      setError("La busqueda debe tener al menos 3 letras")
      return
    }
    if(search.match(/^\d+$/)){
      setError("La busqueda no puede ser un numero")
      return
    }
    setError('')
  },[search])

  return {search, setSearch, error}
}


function App() {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error} = useSearch();
  const { movies, fetchMovies, loading } = useMoviesResult(search, sort)

  const debouncedFetchMovies = useCallback(
    debounce(( search: string) => fetchMovies(search), 500, true)
  ,[fetchMovies])
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    fetchMovies(search)
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const newSearch = event.target.value
    setSearch(newSearch)
    debouncedFetchMovies(search)
  }
  
  const handleBundlerFill = (event: React.ChangeEvent<HTMLInputElement>)=>{
    if (event.target.checked) {
      setSort(!sort)
    }
  }

  return (
    <>
      <header className="input-search">
        <h1>Buscador de Peliculas</h1>
        <form onSubmit={handleSubmit}>
          <input 
            className={error !== '' ? 'error-search' : ''} 
            onChange={handleInput}  placeholder='Avengers, Matrix, ...'
            value={search} name='query' 
          />
          <input 
            type="checkbox" 
            name='fill'
            onChange={handleBundlerFill}
          />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p className="error-text">{error}</p>}
      </header>
      <main className="main">
      {
        loading? 
          <p>Cargando...</p> 
          : <Movies movies={movies} />
      }
      </main>
    </>
  )
}

export default App
