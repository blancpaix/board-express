// 성능상 좋지는 않겠다... 그래도 뭐 해야지
// regex /g 플래그 붙이면 오동작함..;;
const REGEX_EMAIL = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGEX_DISPLAYNAME =  /^[0-9a-zA-Zㄱ-ㅎ가-힣]+$/;
const MAX_EMAIL_LENGTH = 50;
const MAX_DISPLAYNAME_LENGTH = 12;
const MAX_PASSWORD_LENGTH = 24;


const userPropsChecker = (reqBody) => {
  const { email, displayName, password } = reqBody;
  if (email && !REGEX_EMAIL.test(email) || email.length > MAX_EMAIL_LENGTH) throw Error(41211001);
  if (displayName && !REGEX_DISPLAYNAME.test(MAX_PASSWORD_LENGTH) || displayName.length > MAX_DISPLAYNAME_LENGTH) throw Error(41211002);
  if (password && password.length > MAX_EMAIL_LENGTH) throw Error(41211003);

  return;
};

module.exports = {
  userPropsChecker
};