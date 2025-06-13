const express = require('express');
const { PriceList, Travel, Reservation } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

/**
 * Get all travels
 */
router.get('/travels', async (req, res) => {
    try {
        const travels = await Travel.findAll();
        res.json(travels);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch travels' });
    }
});

/**
 * Get travels with currently valid pricelists
 */
router.get('/travels/valid', async (req, res) => {
    try {
        const now = new Date();

        const validTravels = await Travel.findAll({
            include: [
                {
                    model: PriceList,
                    as: 'PriceList',
                    where: { validUntil: { [Op.gt]: now } },
                    attributes: []
                }
            ],
            order: [['createdAt', 'DESC']],
        });

        res.json(validTravels);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch valid travels' });
    }
});
/**
 * Create a new reservation
 */
router.post('/reservations', async (req, res) => {
    try {
        const { firstName, lastName, totalPrice, totalDurationMillis, oldestPriceListId, bookings } = req.body;

        if (!bookings || !Array.isArray(bookings)) {
            return res.status(400).json({ error: 'Bookings must be a valid array.' });
        }

        const newReservation = await Reservation.create({
            firstName,
            lastName,
            totalPrice,
            totalDurationMillis,
            oldestPriceListId,
            bookings,
        });

        res.json(newReservation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create reservation' });
    }
});

/**
 * Get all reservations
 */
router.get('/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reservations' });
    }
});

/**
 * Get reservations with currently valid pricelists for all bookings
 */
router.get('/reservations/valid', async (req, res) => {
    try {
        const now = new Date();

        const validReservations = await Reservation.findAll({
            include: [
                {
                    model: PriceList,
                    as: 'PriceList',
                    where: { validUntil: { [Op.gt]: now } },
                    attributes: []
                }
            ],
            order: [['createdAt', 'DESC']],
        });

        res.json(validReservations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch valid reservations' });
    }
});
/**
 * Get all pricelists
 */
router.get('/pricelists', async (req, res) => {
    try {
        const pricelists = await PriceList.findAll();
        res.json(pricelists);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pricelists' });
    }
});

/**
 * Get pricelists that are currently valid
 */
router.get('/pricelists/valid', async (req, res) => {
    try {
        const validPriceLists = await PriceList.findAll({
            where: { validUntil: { [Op.gt]: new Date() } },
            order: [['createdAt', 'DESC']]
        });
        res.json(validPriceLists);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch valid pricelists' });
    }
});

/**
 * Get pricelists that are invalid (expired)
 */
router.get('/pricelists/invalid', async (req, res) => {
    try {
        const invalidPriceLists = await PriceList.findAll({
            where: { validUntil: { [Op.lt]: new Date() } },
            order: [['createdAt', 'DESC']]
        });
        res.json(invalidPriceLists);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch invalid pricelists' });
    }
});



module.exports = router;
