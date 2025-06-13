import { useState } from 'react';
import axios from 'axios';
export function useCreateReservation() {
    const [loading, setLoading] = useState(false);

    async function createReservation(data: {
        firstName: string;
        lastName: string;
        totalDurationMillis: number;
        oldestPriceListId: string | undefined;
        totalPrice: string;
        bookings: {
            amount: number;
            toName: string;
            companyName: string;
            fromName: string;
            priceListId: string;
            offerId: string
        }[]
    }) {
        setLoading(true);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/reservations`, data);
            return true;
        } catch {
            return false;
        } finally {
            setLoading(false);
        }
    }

    return { createReservation, loading };
}
