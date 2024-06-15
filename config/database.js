const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('express_mysql_app', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
