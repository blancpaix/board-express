const Sequelize = require('sequelize');

const config = {};
const db = {};

const sequelize = new Sequelize('DB_NAME', 'USERNAME', 'PASSWORD', {
  host : 'localhost',
  dialect:  'mysql'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;