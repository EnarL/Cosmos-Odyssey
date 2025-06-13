import React from 'react';
import { useTravel } from '../context/TravelContext';
import { useCart } from '../context/CartContext';
import TravelFilter from '../components/travel/TravelFilter';
import TravelTable from '../components/travel/TravelTable';

const Travel: React.FC = () => {
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

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Search Travel</h2>

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

            {filteredTravels.length > 0 ? (
                <>
                    <TravelTable
                        travels={filteredTravels}
                        sortData={sortData}
                        sortKey={sortKey}
                        sortOrder={sortOrder}
                        columnNames={columnNames}
                        addToCart={addToCart}
                        visibleCount={visibleCount}
                    />
                    {visibleCount < filteredTravels.length && (
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full sm:w-auto"
                            onClick={() => setVisibleCount(visibleCount + 10)}
                        >
                            Show More
                        </button>
                    )}
                </>
            ) : (
                <p className="text-gray-500 italic mt-4">No valid travels found.</p>
            )}
        </div>
    );
};

export default Travel;
