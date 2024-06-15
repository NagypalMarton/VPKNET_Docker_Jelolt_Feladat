const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modellek importálása
db.User = require('./user')(sequelize, Sequelize);

module.exports = db;
