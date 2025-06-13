const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PricingDetails = sequelize.define('PriceList', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    validUntil: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'price_lists',
    timestamps: false
});

module.exports = PricingDetails;
