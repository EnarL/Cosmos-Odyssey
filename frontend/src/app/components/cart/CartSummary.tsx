import React from 'react';
import { Duration } from 'luxon';

interface CartSummaryProps {
    totalPrice: number;
    totalDurationMillis: number;
    durationFormat: string;
    priceFormat: string;
}

const CartSummary: React.FC<CartSummaryProps> = ({
                                                     totalPrice,
                                                     totalDurationMillis,
                                                     durationFormat,
                                                     priceFormat,
                                                 }) => (
    <div className="mt-6 border-t border-gray-300 pt-6 text-gray-800 text-base sm:text-lg font-medium space-y-1">
        <p>
            Total Price:{' '}
            <strong className="text-gray-900">
                €{totalPrice.toLocaleString(priceFormat, { minimumFractionDigits: 2 })}
            </strong>
        </p>
        <p>
            Total Duration:{' '}
            <strong className="text-gray-900">
                {Duration.fromMillis(totalDurationMillis).toFormat(durationFormat)}
            </strong>
        </p>
    </div>
);

export default CartSummary;
