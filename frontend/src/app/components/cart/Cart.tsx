import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import CartTable from './CartTable';
import CartSummary from './CartSummary';
import CartUserForm from './CartUserForm';
import { useInvalidPriceLists } from '../../hooks/useInvalidPriceLists';
import { usePriceLists } from '../../hooks/usePriceLists';
import { useCreateReservation } from '../../hooks/useCreateReservation';
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

    const { invalidPriceListIds, loading: loadingInvalidPLS } = useInvalidPriceLists();
    const { priceLists, loading: loadingPriceLists } = usePriceLists();
    const { createReservation, loading: creatingReservation } = useCreateReservation();

    const isProcessing = loadingInvalidPLS || loadingPriceLists || creatingReservation;


    const buyCart = async () => {
        setErrorMessage('');

        if (loadingInvalidPLS || loadingPriceLists) {
            setErrorMessage("Price list info is loading, please wait.");
            return;
        }
        if (!firstName.trim() || !lastName.trim()) {
            setErrorMessage("First and Last name are required.");
            return;
        }
        if (!invalidPriceListIds) {
            setErrorMessage("Invalid price list data not loaded yet.");
            return;
        }
        if (invalidPriceListIds.some(id => cart.some(item => item.priceListId === id))) {
            setErrorMessage("Your cart contains items from invalid price lists.");
            return;
        }
        if (!priceLists?.length) {
            setErrorMessage("Price list data is not loaded yet.");
            return;
        }

        const sortedPriceLists = [...priceLists].sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        const oldestPriceListId = sortedPriceLists.find(pl =>
            cart.some(item => item.priceListId === pl.id)
        )?.id;

        const reservationData = {
            firstName,
            lastName,
            totalPrice: totalPrice.toFixed(2),
            totalDurationMillis,
            oldestPriceListId,
            bookings: cart.map(({ priceListId, offerId, companyName, fromName, toName, amount }) => ({
                priceListId,
                offerId,
                companyName,
                fromName,
                toName,
                amount,
            })),
        };
        const success = await createReservation(reservationData);
        if (success) {
            setFirstName('');
            setLastName('');
            setCart([]);
        }
    };
    return (
        <div className=" p-4 sm:p-6 mx-auto">
            <div className=" rounded-lg shadow border p-6">
                <h1 className="text-2xl text-black font-bold mb-6 border-b pb-2">Cart</h1>

                <CartTable
                    cart={cart}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    removeOne={removeOne}
                    durationFormat={process.env.NEXT_PUBLIC_DURATION_FORMAT || "h'h' m'm'"}
                    priceFormat={process.env.NEXT_PUBLIC_PRICE_FORMAT || 'en-US'}
                />
                <div className="mt-6 flex flex-col sm:flex-row sm:space-x-6">
                    <div className="flex-1 order-1 sm:order-1">
                        <CartUserForm
                            firstName={firstName}
                            lastName={lastName}
                            setFirstName={setFirstName}
                            setLastName={setLastName}
                        />
                    </div>
                    <div className="flex-1 order-2 sm:order-2 flex flex-col items-end">
                        <div className="w-full sm:w-auto text-right">
                            <CartSummary
                                totalPrice={totalPrice}
                                totalDurationMillis={totalDurationMillis}
                                durationFormat={process.env.NEXT_PUBLIC_DURATION_FORMAT || "h'h' m'm'"}
                                priceFormat={process.env.NEXT_PUBLIC_PRICE_FORMAT || 'en-US'}
                            />
                        </div>

                        <button
                            onClick={buyCart}
                            disabled={isProcessing}
                            className="mt-4 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 disabled:opacity-50 cursor-pointer"
                        >
                            {isProcessing ? 'Processing...' : 'Checkout'}
                        </button>
                    </div>
                </div>
                {errorMessage && (
                    <div className="mt-4 text-red-600 border border-red-200 rounded p-4 bg-red-50">
                        {errorMessage}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Cart;
