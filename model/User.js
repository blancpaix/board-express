const User = (sequelize, DataTypes) => sequelize.define('User', {
  idx : {
    type: DataTypes.UUID,
    allowNull : false,
    primaryKey : true,
    defaultValue : DataTypes.UUIDV1
  },
  displayName : {
    type : DataTypes.STRING,
    allowNull : false,
    validate : {
      min : 2,
      max : 12
    },
  },
  email:  {
    type:  DataTypes.STRING,
    allowNull : false,
    validate : {
      min : 5,
      max : 50,
      isEmail : true,
      // regex 도 넣을수는 있겠다... is Email 이 regex 로 동작하는거일듯?
    },
    unique : true
  },
  password:  {
    type: DataTypes.STRING,
    allowNull : false,
  },
}, {
  indexes: [
    {
      unique : true,
      fields: ['email']
    }
  ],
  paranoid : true,
  modelName: 'Users',
  
});

module.exports = User;