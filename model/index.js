const { Sequelize, Op, DataTypes } = require('sequelize');
const db = {};

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host : process.env.DB_HOST,
  dialect:  process.env.DB_DIALECT,
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;

db.Board = require('./Board')(sequelize, Sequelize);
db.User = require('./User')(sequelize, Sequelize);
db.Token = require('./Token')(sequelize, Sequelize);

db.User.hasMany( db.Board, { foreignKey : 'authorId' });
db.Board.belongsTo(db.User, {
  foreignKey : 'authorId',
});
db.User.hasMany( db.Token, { foreignKey: 'userId'})
db.Token.belongsTo(db.User, {
  foreignKey : 'userId',
});

module.exports = db;