export interface TravelItem {
    offerId: string;
    priceListId: string;
    companyName: string;
    fromName: string;
    toName: string;
    distance: number;
    price: number;
    flightStart: Date;
    flightEnd: Date;
    flightDuration: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Filters {
    searchFrom: string;
    searchTo: string;
    searchCompany: string;
}