const Token = require('../model').Token;
const Op = require('../model').Op;
const jwt = require('jsonwebtoken');


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

  return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
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

  const refreshToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
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

const verifyToken = token => {
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    return { result : true, user: payload.user }
  } catch (err) {
    return { result : false };
  }
};

const verifyRefreshToken = async (token, agent) => {
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    const storedRefreshToken = await getRefreshToken(payload.user, agent);
    
    if (storedRefreshToken == null) {
      throw Error("40120001");
    }
    if (storedRefreshToken.refreshToken != token 
      || storedRefreshToken.userId != payload.user 
      || storedRefreshToken.agent != payload.agent)
      throw Error("412200001")

    return { result : true, user : payload.user, agent : payload.agent };
  } catch (err) {
    if (err.message == "jwt must be provided") {
      err.message = "412200001";
    };

    return { result : false, message : err.message}
  }
}

module.exports = {
  getRefreshToken,
  createAccessToken,
  createRefreshToken,
  verifyToken,
  verifyRefreshToken
}