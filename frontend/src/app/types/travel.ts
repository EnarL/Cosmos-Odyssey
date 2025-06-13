export interface TravelItem {
    offerId: string;
    companyName: string;
    fromName: string;
    toName: string;
    price: number;
    flightDuration: number;
    amount: number;
    priceListId: string;
    distance?: number;
    flightStart?: Date;
    flightEnd?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
