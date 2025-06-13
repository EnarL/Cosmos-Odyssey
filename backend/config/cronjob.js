const cronjob = require("node-cron");
const axios = require("axios");
const { PriceList, Travel, Reservation } = require('../models');

async function cleanInvalidPriceLists() {
    try {
        const { data: invalidPriceLists } = await axios.get(`${process.env.URL}/api/pricelists/invalid`);

        if (invalidPriceLists.length > 15) {
            invalidPriceLists.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            const excessCount = invalidPriceLists.length - 15;
            const priceListsToDelete = invalidPriceLists.slice(0, excessCount);
            await Promise.all(priceListsToDelete.map(async (priceList) => {
                await Promise.all([
                    Travel.destroy({ where: { priceListId: priceList.id } }),
                    PriceList.destroy({ where: { id: priceList.id } }),
                    Reservation.destroy({ where: { oldestPriceListId: priceList.id } })
                ]);
                console.log("Deleted invalid price list:", priceList.id);
            }));
        }
    } catch (error) {
        console.error("Error deleting invalid price lists:", error);
    }
}

async function upsertPriceList(data) {
    try {
        await PriceList.upsert({
            id: data.id,
            validUntil: data.validUntil,
        });

        const travelUpserts = [];

        for (const leg of data.legs) {
            for (const provider of leg.providers) {
                travelUpserts.push(
                    Travel.upsert({
                        priceListId: data.id,
                        legId: leg.id,
                        fromId: leg.routeInfo.from.id,
                        fromName: leg.routeInfo.from.name,
                        toId: leg.routeInfo.to.id,
                        toName: leg.routeInfo.to.name,
                        distance: leg.routeInfo.distance,
                        offerId: provider.id,
                        companyId: provider.company.id,
                        companyName: provider.company.name,
                        price: provider.price,
                        flightStart: provider.flightStart,
                        flightEnd: provider.flightEnd,
                        flightDuration: new Date(provider.flightEnd) - new Date(provider.flightStart),
                    })
                );
            }
        }

        await Promise.all(travelUpserts);

    } catch (error) {
        console.error("Error upserting price list data:", error);
    }
}

async function fetchPrices() {
    try {
        const { data } = await axios.get(process.env.API_URL);

        await upsertPriceList(data);
        await cleanInvalidPriceLists();

        console.log(new Date().toISOString(), "Cronjob: checked");
    } catch (error) {
        console.error("API fetching Error:", error);
    }
}

cronjob.schedule(
    "* * * * *",
    async () => {
        try {
            await fetchPrices();
        } catch (error) {
            console.error("Error in fetchPrices:", error);
        }
    },
    {
        scheduled: true,
        timezone: "UTC",
    }
);

console.log("Cronjob scheduled. Fetching data every minute");
