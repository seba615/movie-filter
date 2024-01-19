import { useState, useRef, useMemo, useEffect } from 'react';
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort }) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //This value is persisted in any render. It's always available.
    const previousSearch = useRef(search);

    //Avoid recreating this function by injecting the parameter
    const getMovies = useMemo(() => {
        return async ({ search }) => {
            if (search === previousSearch.current)
                return;

            setIsLoading(true);
            previousSearch.current = search;
            const newMovies = await searchMovies({ search })
            setTimeout(function () {
                setMovies(newMovies)
                setIsLoading(false);
            }, 2000);
        }
    }, [search]);

    useEffect(() => {
        console.log('rerender')
    }, [getMovies])
    //This is going to be executed the first time and when one of the dependencies changes.
    //Otherwhise, since 'Search' changes on every word, it's going to be rewritten.
    const sortedMovies = useMemo(() => {
        return sort
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies;
    }, [sort, movies])



    return { movies: sortedMovies, getMovies, isLoading };
}