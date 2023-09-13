const Token = require('../model').Token;
const Op = require('../model').Op;
const jwt = require('jsonwebtoken');

const TOKEN_SECRET='ENOUGH_LONG_SECRET_KEY';


const getVerifiedRefreshToken = async (userId, refreshToken, agent) => {
  return await Token.findOne({
    where: {
      [Op.and] : [
        { agent },
        { userId },
        { refreshToken }
      ]
    }
  });
};

const getRefreshToken = async (userId, agent) => {
  return Token.findOne({
    where : {
      [Op.and] : [
        {agent},
        {userId},
      ]
    }
  })
};

// default algo : HS256
const createAccessToken = async (userUid) => {
  const payload = {
    user : userUid,
  };

  return jwt.sign(payload, TOKEN_SECRET, {
    expiresIn : '1h',
    issuer : "http://localhost:3000",
  });
};

// 리프레시 토큰의 중복 최소화
const createRefreshToken = async (userId, agent) => {
  const payload = {
    user : userId,
    agent,
  };

  const refreshToken = jwt.sign(payload, TOKEN_SECRET, {
    expiresIn : '90d',
    issuer : "http://localhost:3000",
  });

  const existingToken = getRefreshToken(userId, agent);
  if (existingToken == null) {
    await Token.create({
      agent,
      refreshToken,
      userId,
    })
  } else {
    await Token.update({ refreshToken }, {
      where : {
        [Op.and] : [
          {agent},
          {userId},
        ]
      }
    })
  }
  
  return refreshToken;
};

module.exports = {
  getRefreshToken,
  createAccessToken,
  createRefreshToken
}