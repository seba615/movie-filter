import { useState, useRef } from 'react';
import { searchMovies } from '../services/movies'

export function useMovies({ search }) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const previousSearch = useRef(search);

    const getMovies = async () => {
        if(search === previousSearch.current)
        return;

        setIsLoading(true);
        previousSearch.current = search;
        const newMovies = await searchMovies({ search })
        setTimeout(function() {
            setMovies(newMovies)
            setIsLoading(false);

        }, 2000);

    }

    return { movies, getMovies, isLoading };
}