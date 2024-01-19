const OMDB_API_KEY = '7106c2fc';
const MOVIE_API_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=`

export const searchMovies = async ({ search }) => {
    if (search === '') return null;
    let url = `${MOVIE_API_URL}${search}`;
    const response = await fetch(url);
    const json = await response.json();
    const movies = json.Search;

    return movies?.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
    }));
}