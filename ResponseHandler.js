// Code Number 정의
// [0-2] HTTP status code
// [3-4] 10: general, 11 : User, 12: Board, 20 : Token
// [5-7] 일련번호

const responseHandler = function(data, resCode) {
  const state = { status : "success", code : resCode };

  switch(resCode) {
    // 회원가입 완료
    case "20011001" :
      state.data = data;
      break;
    // 로그인 & 토큰 발급
    case "20020001":
      state.tokens = data;
      break;
    default : 
      break;
  };

  return state;
}

const errorHandler = function(errorCode) {
  const state = { status : "failed", code : errorCode };
  
  switch(errorCode) {
    case "40120001" :
      state.message = "인증 토큰이 만료되었습니다. 다시 로그인을 해주세요."
      break;
    case "412200001" :
      state.message = "잘못된 접근입니다.";
      break;
    case "41211001":
      state.message = "이메일을 확인하세요."
      break;
    case "41211002":
      state.message = "닉네임을 확인하세요.";
      break;
    case "41211003":
      state.message = "비밀번호를 확인하세요.";
      break;
    case "40111001":
      state.message = "이메일 및 비밀번호를 확인하세요."
      break;
    case "40911001":
      state.message = "이미 사용중인 이메일입니다."
      break;

    default:
      state.code = "50010001";
      state.message = "알 수 없는 오류가 발생하였습니다."
      break;
  };

  return state
};

module.exports = {
  responseHandler,
  errorHandler,
}