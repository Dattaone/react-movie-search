import { useCallback, useState, useRef, useMemo } from 'react'
import { getMovies } from '../services/movies'
import { Movie } from '../types/api'

export function useMoviesResult(search: string, sort: boolean){
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<unknown | null>(null)
    const previousSearch = useRef(search)

    const fetchMovies = useCallback(async (search: string) => {
        if(search === previousSearch.current) return
        try {
            setLoading(true)
            setError(null)
            const newMovies = await getMovies( search )
            setMovies(newMovies)
        } catch (error) {
            setError(error)
        } finally{
            setLoading(false)
        }
    }, []);


    const bundleFill = useMemo(() => {
        return sort? 
                [...movies ].sort((a, b) => a.title.localeCompare(b.title)) 
                : movies
    },[movies, sort])
    

    return { fetchMovies, loading, movies: bundleFill, error }
}
