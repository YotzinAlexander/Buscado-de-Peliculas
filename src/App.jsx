import './App.css'
import { useEffect, useRef, useState } from 'react'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies.jsx'


function useSearch () {
  const [search, updateSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('No se puede buscar vacio')
      return 
    }


    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula')
      return
    }

    if (search.length < 3) {
      setError('la busqueda debe de tener 3 caracteres al menos ')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error}
}

function App() {
  const [sort, setSort] = useState(false)  
  const { search, updateSearch, error} = useSearch()
  const {movies, loading, getMovies} = useMovies({search, sort})

  const handleSubmit = () => {
    event.preventDefault()
    
    getMovies({search})
  }

  const handleSort = () => {
    setSort(!sort)
  }
// Busqueda en tiempo real sin necesidad de precionar boton 
  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(event.target.value);
    getMovies({ search: newSearch})
  }

  return (

    <div className='page'>

      <header>
        <h1>Buscador de peliculas</h1>
      <form className='form' onSubmit={handleSubmit}> 
      <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix...'
          />
          <input type='checkbox' onChange={handleSort} checked={sort} />        
          <button type='submit'>Buscar</button>
      </form>
      { error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> :         <Movies movies={movies}/>
        }

      </main>

    </div>
  )
}

export default App
