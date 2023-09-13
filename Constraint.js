// regex /g 플래그 붙이면 오동작.
const REGEX_EMAIL = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGEX_DISPLAYNAME =  /^[0-9a-zA-Zㄱ-ㅎ가-힣]+$/;
const MAX_EMAIL_LENGTH = 50;
const MAX_DISPLAYNAME_LENGTH = 12;
const MAX_PASSWORD_LENGTH = 24;


const userPropsChecker = (reqBody) => {
  const { email, displayName, password } = reqBody;
  if (email) if (!REGEX_EMAIL.test(email) || email.length > MAX_EMAIL_LENGTH) throw Error(41211001);
  if (displayName) if(!REGEX_DISPLAYNAME.test(MAX_PASSWORD_LENGTH) || displayName.length > MAX_DISPLAYNAME_LENGTH) throw Error(41211002);
  if (password) if (password.length > MAX_EMAIL_LENGTH) throw Error(41211003);

  return;
};

module.exports = {
  userPropsChecker
};