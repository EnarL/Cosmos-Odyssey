import React from 'react';
import { useTravel } from '../../context/TravelContext';
import { useCart } from '../../context/CartContext';
import TravelFilter from './TravelFilter';
import TravelTable from './TravelTable';

interface TravelProps {
    loading: boolean;
}

const Travel: React.FC<TravelProps> = ({ loading }) => {
    const {
        travelRoutes,
        filteredTravels,
        sortData,
        columnNames,
        sortOrder,
        sortKey,
        searchFrom,
        setSearchFrom,
        searchTo,
        setSearchTo,
        searchCompany,
        setSearchCompany,
        toOptions,
        visibleCount,
        setVisibleCount,
        companyOptions
    } = useTravel();

    const { addToCart } = useCart();
    const handleLoadMore = () => {
        setVisibleCount(visibleCount + 10);
        setTimeout(() => {
            window.scrollBy({ top: 300, behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="bg-gray-100 p-4 sm:p-6 mx-auto">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow border p-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 border-b border-blue-400 pb-2">
                Search Travel
            </h2>

            <TravelFilter
                searchFrom={searchFrom}
                setSearchFrom={setSearchFrom}
                searchTo={searchTo}
                setSearchTo={setSearchTo}
                searchCompany={searchCompany}
                setSearchCompany={setSearchCompany}
                fromOptions={Object.keys(travelRoutes)}
                toOptions={toOptions}
                companyOptions={companyOptions}
            />

            {loading ? (
                <div className="flex items-center justify-center mt-10 space-x-2 text-blue-500 italic text-lg">
                    <svg
                        className="animate-spin h-6 w-6 text-blue-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                    </svg>
                    <span>Loading travels...</span>
                </div>
            ) : filteredTravels.length > 0 ? (
                <>
                    <div className="mt-6 shadow-sm rounded-lg overflow-hidden border border-gray-200">
                        <TravelTable
                            travels={filteredTravels}
                            loading={loading}
                            sorting={{ sortKey, sortOrder, onSortChange: sortData }}
                            columnNames={columnNames}
                            onAddToCart={addToCart}
                            visibleCount={visibleCount}
                        />
                    </div>

                    {visibleCount < filteredTravels.length && (
                        <button
                            className="mt-6 mx-auto flex items-center space-x-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
                            onClick={handleLoadMore}
                            aria-label="Load more travels"
                        >
                            <span>Load More</span>
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    )}
                </>
            ) : (
                <div className="mt-10 flex items-center justify-center space-x-2 text-gray-500 italic text-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12h6m-3-3v6m9 3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>No valid travels found.</span>
                </div>
            )}
        </div>
        </div>
    );
};

export default Travel;
