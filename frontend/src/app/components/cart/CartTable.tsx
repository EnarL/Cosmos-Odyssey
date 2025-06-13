import React from 'react';
import { Duration } from 'luxon';

interface CartItem {
    offerId: string;
    companyName: string;
    fromName: string;
    toName: string;
    price: number;
    flightDuration: number;
    amount: number;
    priceListId: string;
}

interface CartTableProps {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (offerId: string) => void;
    removeOne: (offerId: string) => void;
    durationFormat: string;
    priceFormat: string;
}


const CartTable: React.FC<CartTableProps> = ({
                                                 cart,
                                                 addToCart,
                                                 removeFromCart,
                                                 removeOne,
                                                 durationFormat,
                                                 priceFormat,
                                             }) => (
    <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
        <table className="w-full text-left border-collapse table-fixed">
            <thead className="bg-gray-100">
            <tr>
                <th className="py-4 px-2 text-gray-700 font-semibold border-b border-gray-300 w-10 truncate text-center">Nr </th>
                <th className="py-4 px-2 text-gray-700 font-semibold border-b border-gray-300 w-24 truncate align-middle">Company</th>
                <th className="py-4 px-2 text-gray-700 font-semibold border-b border-gray-300 w-30 truncate align-middle">Route</th>
                <th className="py-4 px-2 text-gray-700 font-semibold border-b border-gray-300 w-30 truncate align-middle">Price</th>
                <th className="py-4 px-2 text-gray-700 font-semibold border-b border-gray-300 w-20 truncate align-middle">Duration</th>
                <th className="py-4 px-2 text-gray-700 font-semibold border-b border-gray-300 w-16 truncate text-center align-middle">Qty</th>
                <th className="py-4 px-2 text-gray-700 font-semibold border-b border-gray-300 w-30 align-middle">Actions</th>
            </tr>
            </thead>
            <tbody>
            {cart.map((item, idx) => (
                <tr key={item.offerId} className="transition-colors duration-200">
                    <td className="py-4 px-2 text-gray-800 border-b border-gray-200 text-center align-middle">{idx + 1}</td>
                    <td className="py-4 px-2 text-gray-800 border-b border-gray-200 truncate align-middle" title={item.companyName}>{item.companyName}</td>
                    <td className="py-4 px-2 text-gray-800 border-b border-gray-200 truncate align-middle" title={`${item.fromName} → ${item.toName}`}>
                        {item.fromName} &rarr; {item.toName}
                    </td>
                    <td
                        className="py-4 px-2 text-gray-800 border-b border-gray-200 truncate align-middle"
                        title={`€${item.price.toLocaleString(priceFormat, { minimumFractionDigits: 2 })}`}
                    >
                        €{item.price.toLocaleString(priceFormat, { minimumFractionDigits: 2 })}
                    </td>
                    <td
                        className="py-4 px-2 text-gray-800 border-b border-gray-200 truncate align-middle"
                        title={item.flightDuration > 0 ? Duration.fromMillis(item.flightDuration).toFormat(durationFormat) : 'N/A'}
                    >
                        {item.flightDuration > 0 ? Duration.fromMillis(item.flightDuration).toFormat(durationFormat) : 'N/A'}
                    </td>
                    <td className="py-4 text-gray-800 border-b border-gray-200 text-center align-middle">{item.amount}</td>
                    <td className="py-4 px-2 border-b border-gray-200 space-x-1 align-middle">
                        <button
                            onClick={() => addToCart(item)}
                            className="bg-green-100 text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 rounded-md px-3 py-1 text-sm transition"
                            aria-label={`Add one more of ${item.companyName} ${item.fromName} to ${item.toName}`}
                        >
                            +
                        </button>
                        <button
                            onClick={() => removeOne(item.offerId)}
                            className="bg-red-100 text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-md px-3 py-1 text-sm transition"
                            aria-label={`Remove one of ${item.companyName} ${item.fromName} to ${item.toName}`}
                        >
                            -
                        </button>
                        <button
                            onClick={() => removeFromCart(item.offerId)}
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md px-3 py-1 text-sm transition cursor-pointer"
                            aria-label={`Remove all of ${item.companyName} ${item.fromName} to ${item.toName} from cart`}
                        >
                            Remove
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default CartTable;
