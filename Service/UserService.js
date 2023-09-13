const User = require('../model').User;
const bcrypt = require('bcrypt');

const SALT_ROUND = 12;

const findUser = async (email) => {
  return await User.findOne({
    where : { email }
  });
};

const createUser = async (email, displayName, password) => {
  const user = await findUser(email);
  if(user) throw Error(40911001)

  const hashedPassword = bcrypt.hashSync(password, SALT_ROUND);
  
  const id = await User.create({
    email,
    displayName,
    password: hashedPassword,
  });

  
  return id.dataValues;
};

const verifyUser = (email, password) => {
  const user = findUser(email);
  
  if (bcrypt.compare(password, user.password)) {
    // 로그인 완료
  } else {
    throw Error(40111001);
  }
}

module.exports = {
  findUser,
  createUser,

};