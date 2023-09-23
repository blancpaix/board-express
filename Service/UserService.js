const User = require('../model').User;
const bcrypt = require('bcrypt');
const { createAccessToken, createRefreshToken } = require('./TokenService');

const SALT_ROUND = 12;

const findUser = async (email) => {
  return await User.findOne({
    attributes : [
      'idx', 'email', 'password'
    ],
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

const verifyUser = async (email, password, agent) => {
  const user = await findUser(email);

  // 비밀번호 확인이 비용이 더 적을듯?
  if (bcrypt.compare(password, user.password)) {
    const tokens = {};
    tokens.accessToken = await createAccessToken(user.idx);
    tokens.refreshToken = await createRefreshToken(user.idx, agent);

    return tokens;
  } else {
    throw Error(40111001);
  }
};


module.exports = {
  findUser,
  createUser,
  verifyUser
};