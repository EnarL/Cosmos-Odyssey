const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reservation = sequelize.define('Reservation', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    totalPrice: { type: DataTypes.FLOAT, allowNull: false },
    totalDurationMillis: { type: DataTypes.FLOAT, allowNull: false },
    oldestPriceListId: { type: DataTypes.UUID, allowNull: false, primaryKey: true },

    bookings: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
        validate: {
            isArray(value) {
                if (!Array.isArray(value)) {
                    throw new Error('Bookings must be a valid array.');
                }
            },
            notEmpty: true
        }
    }
});

module.exports = Reservation;
