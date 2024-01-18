import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies';


function App() {


  const {movies} = useMovies();

  return (
    <div className='page'>
      <header>
        <h1>Movie filter</h1>
        <form className='form'>
          <input placeholder='Sherlock Holmes, Avengers Endgame, The Godfather...'></input>
          <button type='submit'>Search</button>
        </form>
      </header>
      <main>
        <Movies movies = {movies} />
      </main>
    </div >

  )
}

export default App