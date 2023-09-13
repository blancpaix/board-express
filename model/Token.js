
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
  // 공식문서랑 안맞음
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("NOW()"),
  }
}, {
  indexes: [
    {
      unique : false,
      fields: ['userId']
    }
  ],
  
});

module.exports = Token;