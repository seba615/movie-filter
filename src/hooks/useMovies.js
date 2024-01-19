import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort }) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //This value is persisted in any render. It's always available.
    const previousSearch = useRef(search);

    //The same as useMemo but for functions
    const getMovies = useCallback(
        //Avoid recreating this function by injecting the parameter
        async ({ search }) => {
            if (search === previousSearch.current)
                return;

            setIsLoading(true);
            previousSearch.current = search;
            const newMovies = await searchMovies({ search })
            setTimeout(function () {
                setMovies(newMovies)
                setIsLoading(false);
            }, 2000);
        }, [search]);

    //This is going to be executed the first time and when one of the dependencies changes.
    //Otherwhise, since 'Search' changes on every word, it's going to be rewritten.
    const sortedMovies = useMemo(() => {
        return sort
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies;
    }, [sort, movies])



    return { movies: sortedMovies, getMovies, isLoading };
}