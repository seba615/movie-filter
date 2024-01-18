import { useEffect, useRef, useState } from 'react';
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies';

function useSearch() {
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirstTime = useRef(true);

  useEffect(() => {
    if (isFirstTime.current) {
      isFirstTime.current = search === ''
      return;
    }
    setError(null);

    if (search === '') {
      setError('Movie name can not be empty.')
      return;
    }

    if (search.length < 3) {
      setError('Search should contains at least three letters.')
      return;
    }

    setError(null);
  }, [search]);

  return { search, setSearch, error };
}

function App() {
  const { movies } = useMovies();
  const { search, setSearch, error } = useSearch();

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const handleChange = (event) => {
    const newNameFilter = event.target.value;
    if (newNameFilter.startsWith(' ')) return;
    setSearch(newNameFilter);
  }

  return (
    <div className='page'>
      <header>
        <h1>Movie filter</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent' }} onChange={handleChange} value={search} placeholder='Sherlock Holmes, Avengers Endgame, The Godfather...'></input>
          <button type='submit'>Search</button>
        </form>
        {error && <p style= {{color: 'red'}}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div >

  )
}

export default App