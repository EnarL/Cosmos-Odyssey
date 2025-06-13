import { useState, useEffect } from 'react';
import axios from 'axios';
import { TravelItem } from '../types/travel';

export const useTravelItems = () => {
    const [items, setItems] = useState<TravelItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/api/travels/valid`)
            .then((res) => setItems(res.data))
            .catch(() => setError('Failed to fetch travel items'))
            .finally(() => setLoading(false));
    }, []);

    return { items, loading, error };
};
