const Board = (sequelize, DataTypes) => sequelize.define('Board', {
  idx : {
    type : DataTypes.INTEGER,
    allowNull : false,
    autoIncrement : true,
    primaryKey : true,
  },
  title:  {
    type : DataTypes.STRING,
    allowNull : false,
    validate : {
      max : 30
    },
  },
  content : {
    type: DataTypes.STRING, 
    allowNull: false,
    validate : {
      max : 2000
    },
  },
  author: {
    type : DataTypes.STRING,
    allowNull : false,
  },
  authoerId: {
    type : DataTypes.STRING,
    allowNull : false,
  }

}, {
  paranoid : true,
  modelName : "Boards"
});

module.exports = Board;