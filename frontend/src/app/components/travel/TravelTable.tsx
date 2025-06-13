import React from 'react';
import { Duration } from 'luxon';
import { TravelItem } from '../../types/travel';

const durationFormat = process.env.NEXT_PUBLIC_DURATION_FORMAT || "h'h' m'm'";
const distanceFormat = process.env.NEXT_PUBLIC_DISTANCE_FORMAT || 'en-US';
const priceFormat = process.env.NEXT_PUBLIC_PRICE_FORMAT || 'en-US';

interface TravelTableProps {
    travels: TravelItem[];
    loading: boolean;
    sorting: {
        sortKey: keyof TravelItem;
        sortOrder: 'asc' | 'desc';
        onSortChange: (key: keyof TravelItem) => void;
    };
    onAddToCart: (travel: TravelItem) => void;
    visibleCount: number;
    onShowMore?: () => void;
    columnNames: Record<keyof TravelItem, string>;
}

const TravelTable: React.FC<TravelTableProps> = ({
                                                     travels,
                                                     loading,
                                                     sorting,
                                                     onAddToCart,
                                                     visibleCount,
                                                     columnNames
                                                 }) => {
    const { sortKey, sortOrder, onSortChange } = sorting;

    const sortableKeys: (keyof TravelItem)[] = [
        'companyName',
        'fromName',
        'toName',
        'distance',
        'price',
        'flightStart',
        'flightEnd',
        'flightDuration',
    ];

    return (
        <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded text-sm sm:text-base">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-2 py-2 text-left text-gray-900">Nr</th>
                    {sortableKeys.map((key) => (
                        <th key={key} className="px-2 py-2 text-left text-gray-900">
                            <button
                                className="text-gray-900 hover:text-blue-500"
                                onClick={() => onSortChange(key)}
                            >
                                {columnNames[key]} {sortKey === key && (sortOrder === 'asc' ? '▲' : '▼')}
                            </button>
                        </th>
                    ))}
                    <th className="w-10"></th> {/* empty header for + sign */}
                </tr>
                </thead>
                <tbody>
                {loading ? (
                    <tr>
                        <td colSpan={sortableKeys.length + 2} className="text-center py-4 text-gray-700">
                            Loading travels...
                        </td>
                    </tr>
                ) : travels.length === 0 ? (
                    <tr>
                        <td colSpan={sortableKeys.length + 2} className="text-center py-4 text-gray-700">
                            No travels found.
                        </td>
                    </tr>
                ) : (
                    travels.slice(0, visibleCount).map((travel, index) => (
                        <tr key={travel.offerId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-2 py-2 text-gray-900">{index + 1}</td>
                            <td className="px-2 py-2 text-gray-900">{travel.companyName}</td>
                            <td className="px-2 py-2 text-gray-900">{travel.fromName}</td>
                            <td className="px-2 py-2 text-gray-900">{travel.toName}</td>
                            <td className="px-2 py-2 text-gray-900">
                                {travel.distance?.toLocaleString(distanceFormat) || 'N/A'}
                            </td>
                            <td className="px-2 py-2 text-gray-900">
                                €{travel.price.toLocaleString(priceFormat, { minimumFractionDigits: 2 })}
                            </td>
                            <td className="px-2 py-2 text-gray-900">
                                {travel.flightStart
                                    ? `${travel.flightStart.toLocaleDateString()} ${travel.flightStart.toLocaleTimeString()}`
                                    : 'N/A'}
                            </td>
                            <td className="px-2 py-2 text-gray-900">
                                {travel.flightEnd
                                    ? `${travel.flightEnd.toLocaleDateString()} ${travel.flightEnd.toLocaleTimeString()}`
                                    : 'N/A'}
                            </td>
                            <td className="px-2 py-2 text-gray-900">
                                {travel.flightDuration > 0
                                    ? Duration.fromMillis(travel.flightDuration).toFormat(durationFormat)
                                    : 'N/A'}
                            </td>
                            <td className="px-2 py-2 text-center">
                                <button
                                    className="text-green-600 font-bold text-lg hover:text-green-800 transition"
                                    onClick={() => onAddToCart(travel)}
                                    aria-label="Add to cart"
                                >
                                    +
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default TravelTable;
