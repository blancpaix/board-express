const asyncHandler = require("../AsyncHandler");
const { createAccessToken, verifyToken, verifyRefreshToken, createRefreshToken } = require("../Service/TokenService");

const verifyJwt = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization) {
    const accessToken = req.headers.authorization.split("Bearer ")[1];
    const decryptedAccessToken = verifyToken(accessToken);

    if (decryptedAccessToken.result) {
      req.id = decryptedAccessToken.user;
      next();
      return;
    }

    const refreshToken = req.headers.refresh;
    const agent = req.headers['user-agent'];
    const decryptedRefreshToken = await verifyRefreshToken(refreshToken, agent);

    if (decryptedRefreshToken.result) {
      const reissuedAccessToken = await createAccessToken(decryptedRefreshToken.user);
      const reissuedRefreshToken = await createRefreshToken(decryptedRefreshToken.user, agent);

      req.id = decryptedRefreshToken.user;

      res.header({
        'Authorization' : "Bearer " + reissuedAccessToken,
        'refresh' : reissuedRefreshToken,
      });
      next();
    } else {
      
      throw Error(decryptedRefreshToken.message);
    }
  } else {
    throw Error(412200001);
  }
});


module.exports = {
  verifyJwt
}