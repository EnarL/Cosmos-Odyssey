import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { TravelItem } from "../types/travel";

interface TravelContextType {
    travelRoutes: Record<string, string[]>;
    filteredTravels: TravelItem[];
    sortData: (key: keyof TravelItem) => void;
    columnNames: Record<keyof TravelItem, string>;
    sortedItems: TravelItem[];
    setSortedItems: (items: TravelItem[]) => void;
    sortOrder: 'asc' | 'desc';
    setSortOrder: (order: 'asc' | 'desc') => void;
    sortKey: keyof TravelItem;
    setSortKey: (key: keyof TravelItem) => void;
    searchFrom: string;
    setSearchFrom: (from: string) => void;
    searchTo: string;
    setSearchTo: (to: string) => void;
    searchCompany: string;
    setSearchCompany: (company: string) => void;
    fromOptions: string[];
    setFromOptions: (options: string[]) => void;
    toOptions: string[];
    setToOptions: (options: string[]) => void;
    visibleCount: number;
    setVisibleCount: (count: number) => void;
    companyOptions: string[];
    setCompanyOptions: (options: string[]) => void;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

interface TravelProviderProps {
    children: ReactNode;
    items: TravelItem[];
}

export const TravelProvider: React.FC<TravelProviderProps> = ({ children, items }) => {
    const travelRoutes: Record<string, string[]> = {
        Mercury: ["Venus"],
        Venus: ["Mercury", "Earth"],
        Earth: ["Uranus", "Jupiter"],
        Mars: ["Venus"],
        Jupiter: ["Venus", "Mars"],
        Saturn: ["Earth", "Neptune"],
        Uranus: ["Saturn", "Neptune"],
        Neptune: ["Mercury", "Uranus"],
    };

    const [sortedItems, setSortedItems] = useState<TravelItem[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortKey, setSortKey] = useState<keyof TravelItem>('companyName');

    const [searchFrom, setSearchFrom] = useState<string>('');
    const [searchTo, setSearchTo] = useState<string>('');
    const [searchCompany, setSearchCompany] = useState<string>('');
    const [fromOptions, setFromOptions] = useState<string[]>([]);
    const [toOptions, setToOptions] = useState<string[]>([]);
    const [visibleCount, setVisibleCount] = useState<number>(10);
    const [companyOptions, setCompanyOptions] = useState<string[]>([]);

    const columnNames: Record<keyof TravelItem, string> = {
        amount: "",
        priceListId: "Price List ID",
        offerId: "Offer ID",
        fromName: "From",
        toName: "To",
        distance: "Distance",
        price: "Price",
        flightStart: "Flight Start",
        flightEnd: "Flight End",
        companyName: "Company Name",
        flightDuration: "Flight Duration",
        createdAt: "Created At",
        updatedAt: "Updated At"
    };

    useEffect(() => {
        const travelsData = items.map((item) => ({
            ...item,
            flightStart: item.flightStart ? new Date(item.flightStart) : undefined,
            flightEnd: item.flightEnd ? new Date(item.flightEnd) : undefined,
            createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
            updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
        }));
        setSortedItems(travelsData);
        setCompanyOptions([...new Set(travelsData.map(item => item.companyName))]);
    }, [items]);

    useEffect(() => {
        if (searchFrom) {
            setToOptions(travelRoutes[searchFrom] || []);
        } else if (searchTo) {
            const availableFrom = Object.keys(travelRoutes).filter(from => travelRoutes[from].includes(searchTo));
            setFromOptions(availableFrom);
        } else {
            setToOptions([]);
            setFromOptions([]);
        }
    }, [searchFrom, searchTo]);

    const sortData = (key: keyof TravelItem): void => {
        const order = (sortKey === key && sortOrder === 'asc') ? 'desc' : 'asc';
        setSortKey(key);
        setSortOrder(order);
        setSortedItems((prevItems) => {
            return [...prevItems].sort((a, b) => {
                if (a[key] instanceof Date && b[key] instanceof Date) {
                    return order === 'asc' ? +a[key] - +b[key] : +b[key] - +a[key];
                }
                if (typeof a[key] === 'number' && typeof b[key] === 'number') {
                    return order === 'asc' ? a[key] - b[key] : b[key] - a[key];
                }
                if (typeof a[key] === 'string' && typeof b[key] === 'string') {
                    return order === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
                }
                return 0;
            });
        });
    };


    const filteredTravels = sortedItems.filter(travel => (
        (!searchFrom || travel.fromName === searchFrom) &&
        (!searchTo || travel.toName === searchTo) &&
        (!searchCompany || travel.companyName === searchCompany)
    ));

    return (
        <TravelContext.Provider value={{
            travelRoutes,
            filteredTravels,
            sortData,
            columnNames,
            sortedItems,
            setSortedItems,
            sortOrder,
            setSortOrder,
            sortKey,
            setSortKey,
            searchFrom,
            setSearchFrom,
            searchTo,
            setSearchTo,
            searchCompany,
            setSearchCompany,
            fromOptions,
            setFromOptions,
            toOptions,
            setToOptions,
            visibleCount,
            setVisibleCount,
            companyOptions,
            setCompanyOptions,
        }}>
            {children}
        </TravelContext.Provider>
    );
};

export const useTravel = (): TravelContextType => {
    const context = useContext(TravelContext);
    if (context === undefined) {
        throw new Error('useTravel must be used within a TravelProvider');
    }
    return context;
};