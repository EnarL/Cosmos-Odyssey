require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const routes = require('./routes/routes');
const server = express();
require("./config/cronjob");

server.use(express.json());
server.use(cors());

sequelize.sync()
    .then(() => console.log("Database Connected in server.js"))
    .catch(err => console.error(err));

server.use('/api', routes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`backend running on port ${PORT}`));