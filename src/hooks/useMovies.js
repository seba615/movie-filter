import { useState } from 'react';
import { searchMovies } from '../services/movies'

export function useMovies({ search }) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getMovies = async () => {
        setIsLoading(true);
        const newMovies = await searchMovies({ search })

        setTimeout(function() {
            setMovies(newMovies)
            setIsLoading(false);

        }, 2000);

    }

    return { movies, getMovies, isLoading };
}