// ResponseCode 정의
// [0-2] HTTP status code
// [3-4] 11 : User, 12: Board
// [5-7] 일련번호

// ErrorCode 정의
// [0-2] HTTP status code
// [3-4] 10 : general, 11 : User, 12: Board
// [5-7] 일련번호

const responseHnalder = function(data, resCode) {
  const state = { status : "success", code : resCode };

  switch(resCode) {
    case "20011001" :
      state.data = data;
      break;
    default : 
      break;
  };

  return state;
}

const errorHandler = function(errorCode) {
  const state = { status : "failed", code : errorCode };
  
  switch(errorCode) {
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
  responseHnalder,
  errorHandler,
}