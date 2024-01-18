
import withoutResults from '.././mocks/movies-list.json'

function ListOfMovies({ movies }) {
    return (<ul>
        {
            movies.map(movie => (
                <li key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img src={movie.poster}></img>
                </li>
            )

            )
        }
    </ul>)
}

export function NoMoviesResult() {
    return (
        <p>Not movies found for this search</p>
    );
}

export function Movies({ movies }) {
    const hasMovies = movies?.length > 0;

    return (
        hasMovies
            ? <ListOfMovies movies={movies} />
            : <NoMoviesResult />
    )
}