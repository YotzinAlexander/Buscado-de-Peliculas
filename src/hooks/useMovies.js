import { useRef, useState, useMemo, useCallback } from 'react'
import {searchMovies} from '../services/movies.js'


export function useMovies ({search, sort}) {
    const [movies, setMovies ] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previusSearch = useRef(search)

    const getMovies = useCallback( async ({search} ) => {
        if( search === previusSearch.current) return
        try {
            setLoading(true);
            setError(null)
            previusSearch.current = search
            const newMovies =  await searchMovies({search})
            setMovies(newMovies)
        } catch (e){
            setError(e.message)
        } finally {
            setLoading(false)
        }
      },
    [])

    // const sortMovies =  sort 
    //     ? [...movies].sort((a,b) => a.title.localeCompare(b.title))
    //     : movies


    
    const sortMovies =  useMemo(() => {
        //console.log('Renderizado por ordenar useMemo')
       return  sort
        ? [...movies].sort((a,b) => a.title.localeCompare(b.title))
        : movies
    }, [sort, movies]) 
        


    return { movies: sortMovies, getMovies, loading }
  }
  