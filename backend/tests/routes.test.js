const request = require('supertest');
const express = require('express');

// Mock models before importing routes
jest.mock('../models', () => ({
    Travel: {
        findAll: jest.fn(),
    },
    PriceList: {
        findAll: jest.fn(),
    },
    Reservation: {
        findAll: jest.fn(),
        create: jest.fn(),
    },
}));

const { Travel, PriceList, Reservation } = require('../models');
const router = require('../routes/routes');

const app = express();
app.use(express.json());
app.use('/', router);

describe('API routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /travels', () => {
        it('should return 200 and an array', async () => {
            Travel.findAll.mockResolvedValue([{ id: 1, name: 'Test Travel' }]);

            const res = await request(app).get('/travels');

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body[0].name).toBe('Test Travel');
        });
    });

    describe('GET /travels/valid', () => {
        it('should return 200 and an array', async () => {
            Travel.findAll.mockResolvedValue([{ id: 2, name: 'Valid Travel' }]);

            const res = await request(app).get('/travels/valid');

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /pricelists', () => {
        it('should return 200 and an array', async () => {
            PriceList.findAll.mockResolvedValue([{ id: 1, price: 100 }]);

            const res = await request(app).get('/pricelists');

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /pricelists/valid', () => {
        it('should return 200 and an array', async () => {
            PriceList.findAll.mockResolvedValue([{ id: 2, price: 150 }]);

            const res = await request(app).get('/pricelists/valid');

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /pricelists/invalid', () => {
        it('should return 200 and an array', async () => {
            PriceList.findAll.mockResolvedValue([{ id: 3, price: 50 }]);

            const res = await request(app).get('/pricelists/invalid');

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('POST /reservations', () => {
        it('should create a reservation with valid bookings', async () => {
            Reservation.create.mockResolvedValue({
                id: 123,
                firstName: 'John',
                lastName: 'Doe',
                totalPrice: 100,
                totalDurationMillis: 3600000,
                oldestPriceListId: 1,
                bookings: [{ travelId: 1, priceListId: 2 }]
            });

            const res = await request(app)
                .post('/reservations')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    totalPrice: 100,
                    totalDurationMillis: 3600000,
                    oldestPriceListId: 1,
                    bookings: [{ travelId: 1, priceListId: 2 }]
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id');
            expect(res.body.firstName).toBe('John');
        });

        it('should return 400 if bookings is missing or invalid', async () => {
            const res = await request(app)
                .post('/reservations')
                .send({
                    firstName: 'Jane',
                    lastName: 'Doe',
                    totalPrice: 100,
                    totalDurationMillis: 3600000,
                    oldestPriceListId: 1,
                    bookings: null,
                });

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('error');
        });
    });

    describe('GET /reservations', () => {
        it('should return 200 and an array', async () => {
            Reservation.findAll.mockResolvedValue([{ id: 1, firstName: 'John' }]);

            const res = await request(app).get('/reservations');

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /reservations/valid', () => {
        it('should return 200 and an array', async () => {
            Reservation.findAll.mockResolvedValue([{ id: 2, firstName: 'Jane' }]);

            const res = await request(app).get('/reservations/valid');

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });
});
