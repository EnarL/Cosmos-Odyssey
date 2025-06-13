'use client';

import React from 'react';
import Travel from './components/travel/Travel';
import Cart from './components/cart/Cart';
import { CartProvider } from './context/CartContext';
import { TravelProvider } from './context/TravelContext';
import { useTravelItems } from './hooks/useValidTravels';

const Page: React.FC = () => {
    const { items, loading, error } = useTravelItems();

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
                <div className="text-red-600 text-lg font-semibold bg-red-100 p-4 rounded shadow-md">
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <main className="max-w-6xl mx-auto">
                <TravelProvider items={items}>
                    <CartProvider>
                        <div className="mb-8">
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                <Cart />
                            </div>
                        </div>

                        <Travel loading={loading} />
                    </CartProvider>
                </TravelProvider>
            </main>
        </div>
    );
};

export default Page;
