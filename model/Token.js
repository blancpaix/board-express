
const Token = (sequelize, DataTypes) => sequelize.define('Token', {
  idx : {
    type: DataTypes.INTEGER,
    autoIncrement : true,
    allowNull : false,
    primaryKey : true,
  },
  agent : {
    type : DataTypes.STRING,
    allowNull : false,
  },
  refreshToken : {
    type : DataTypes.STRING(320),
    allowNull : false,
  },
  userId : {
    type : DataTypes.UUID,
    allowNull : false,
  },
  createdAt: {
    type : DataTypes.DATEONLY,
    defaultValuie: DataTypes.NOW,
    
  }
}, {
  indexes: [
    {
      unique : false,
      fields: ['userId']
    }
  ],
  paranoid : false,
  timestamps : false,
});

module.exports = Token;