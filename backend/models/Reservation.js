const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bookings = sequelize.define('Reservation', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    totalDurationMillis: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    oldestPriceListId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    bookings: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
        validate: {
            isValidBookings(value) {
                if (!Array.isArray(value)) {
                    throw new Error('Bookings must be an array.');
                }
                for (const booking of value) {
                    const requiredFields = ['offerId', 'companyName', 'fromName', 'toName', 'amount'];
                    for (const field of requiredFields) {
                        if (!booking[field]) {
                            throw new Error(`Each booking must have property "${field}".`);
                        }
                    }
                }
            }
        }
    }
}, {
    tableName: 'reservations',
    timestamps: false
});

module.exports = Bookings;
