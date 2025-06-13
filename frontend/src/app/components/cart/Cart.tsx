import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartTable from '../components/cart/CartTable';
import CartSummary from '../components/cart/CartSummary';
import CartUserForm from '../components/cart/CartUserForm';

import { useInvalidPriceLists } from '../hooks/useInvalidPriceLists';
import { usePriceLists } from '../hooks/usePriceLists';
import { useCreateReservation } from '../hooks/useCreateReservation';

const durationFormat = process.env.NEXT_PUBLIC_DURATION_FORMAT || "h'h' m'm'";
const priceFormat = process.env.NEXT_PUBLIC_PRICE_FORMAT || 'en-US';

const Cart: React.FC = () => {
    const {
        cart,
        setCart,
        addToCart,
        removeFromCart,
        removeOne,
        totalPrice,
        totalDurationMillis,
        errorMessage,
        setErrorMessage,
    } = useCart();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // Use hooks
    const { invalidPriceListIds, error: invalidPLSError, loading: loadingInvalidPLS } = useInvalidPriceLists();
    const { priceLists, error: priceListsError, loading: loadingPriceLists } = usePriceLists();
    const { createReservation, error: createReservationError, loading: creatingReservation } = useCreateReservation();

    const isProcessing = loadingInvalidPLS || loadingPriceLists || creatingReservation;

    React.useEffect(() => {
        if (invalidPLSError) setErrorMessage(invalidPLSError);
        else if (priceListsError) setErrorMessage(priceListsError);
        else if (createReservationError) setErrorMessage(createReservationError);
        else setErrorMessage('');
    }, [invalidPLSError, priceListsError, createReservationError, setErrorMessage]);

    const buyCart = async (): Promise<void> => {
        setErrorMessage('');

        if (!firstName.trim() || !lastName.trim()) {
            setErrorMessage("First Name and Last Name are required for booking.");
            return;
        }

        if (!invalidPriceListIds || invalidPriceListIds.length === 0) {
            setErrorMessage("Price list information is not loaded yet. Please wait.");
            return;
        }

        const bookings = cart.map(item => ({
            priceListId: item.priceListId,
            offerId: item.offerId,
            companyName: item.companyName,
            fromName: item.fromName,
            toName: item.toName,
            amount: item.amount,
        }));

        for (const booking of bookings) {
            if (invalidPriceListIds.includes(booking.priceListId)) {
                setErrorMessage("You tried to purchase a ticket from an invalid pricelist.");
                return;
            }
        }

        if (!priceLists || priceLists.length === 0) {
            setErrorMessage("Price list information is not loaded yet. Please wait.");
            return;
        }

        const sortedPriceLists = [...priceLists].sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        const oldestMatchingPriceListId = sortedPriceLists.find(priceList =>
            bookings.some(booking => booking.priceListId === priceList.id)
        )?.id;

        const reservationData = {
            firstName,
            lastName,
            totalPrice: totalPrice.toFixed(2),
            totalDurationMillis,
            oldestPriceListId: oldestMatchingPriceListId,
            bookings,
        };

        const success = await createReservation(reservationData);
        if (success) {
            setFirstName('');
            setLastName('');
            setCart([]);
        }
    };

    return (
        <div className="bg-gray-100 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-300 p-4 sm:p-6">
                <h1 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6 border-b pb-2 sm:pb-4">Shopping Cart</h1>

                <CartTable
                    cart={cart}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    removeOne={removeOne}
                    durationFormat={durationFormat}
                    priceFormat={priceFormat}
                />

                <CartSummary
                    totalPrice={totalPrice}
                    totalDurationMillis={totalDurationMillis}
                    durationFormat={durationFormat}
                    priceFormat={priceFormat}
                    onCheckout={buyCart}
                    isProcessing={isProcessing}
                />

                {errorMessage && (
                    <div className="mt-4 text-red-600 border border-red-200 rounded-lg p-4 bg-red-50">
                        {errorMessage}
                    </div>
                )}

                <CartUserForm
                    firstName={firstName}
                    lastName={lastName}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                />
            </div>
        </div>
    );
};

export default Cart;
