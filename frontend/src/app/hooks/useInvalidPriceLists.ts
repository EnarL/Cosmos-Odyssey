import { useState, useEffect } from 'react';
import axios from 'axios';

export function useInvalidPriceLists() {
    const [invalidPriceListIds, setInvalidPriceListIds] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/pricelists/invalid`)
            .then(res => {
                setInvalidPriceListIds(res.data.map((p: { id: string }) => p.id));
                setError(null);
            })
            .catch(() => setError('Failed to fetch invalid pricelists'))
            .finally(() => setLoading(false));
    }, []);

    return { invalidPriceListIds, error, loading };
}
