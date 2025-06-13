import { useState, useEffect } from 'react';
import axios from 'axios';


export function usePriceLists() {
    const [priceLists, setPriceLists] = useState<never[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/pricelists`)
            .then(res => {
                setPriceLists(res.data);
                setError(null);
            })
            .catch(() => setError('Failed to fetch pricelists'))
            .finally(() => setLoading(false));
    }, []);

    return { priceLists, error, loading };
}
