import axios, { AxiosResponse } from "axios";
import { List } from "immutable";
import storage from "lib/storage";

// const restBaseApi = "http://i02a205.p.ssafy.io:8080/A205/"
const restBaseApi = "http://70.12.247.87:8080/"; // 이신호
// const restBaseApi = "http://13.124.127.232:8080/A205/"; // AWS
// const restBaseApi = "http://70.12.247.87:8080/"; // 이신호
// const restBaseApi = "http://13.124.127.232:8080/A205/"; // AWS

//const restBaseApi = "http://70.12.247.34:8080/"; // 박정환
// const restBaseApi = "http://70.12.247.126:8080/"; // 김동주

/*
★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆
인증 관련 API 는
사용자가 로그인 하지 않은 상태에서 요청하기 때문에
사용자 Token 을 필요로 하지 않는다. ( Back-end쪽에서도 예외처리 필요. )

예외 : 로그아웃은 사용자 Token을 필요로 함.
★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆
*/

// 2020-02-16 01:25 간혹 token을 요구하는 api가 있어서 임시로 토큰을 할당함. 나중에 토큰은 전부 삭제 필요.
// sendSignUpEmail
// changePasswordEmailSend
const token =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxd2VydEBuYXZlci5jb20iLCJhdWQiOiIyNiIsImlzcyI6InF3ZXJ0IiwiZXhwIjoxNjEzMTc4MTQ4LCJpYXQiOjE1ODE2NDIxNDh9.qiTNnygKG972ykS6jRswyMIP6mfbnEFhCZraN-RUb3xJlSDbS46SNNQY3g9adOojGWS5XuFjdXXS7crybvkYVA";

// let token = storage.get('token'); // 로그아웃을 위한 사용자 token

export const checkEmailExists = (email: string) => {
  try {
    return axios.get(restBaseApi + "rest/CheckEmail/" + email);
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const checkUsernameExists = (userid: string) => {
  try {
    return axios.get(restBaseApi + "rest/CheckId/" + userid);
  } catch (error) {
    return true;
  }
};

interface Iregister {
  email: string;
  password: string;
  userid: string;
}
export const localRegister: ({
  email,
  password,
  userid
}: Iregister) => false | Promise<AxiosResponse<any>> = ({
  email,
  password,
  userid
}: Iregister) => {
  let data = {
    m_email: email,
    m_password: password,
    m_userid: userid
  };
  try {
    console.log("체크 : ", data);
    return axios.post(restBaseApi + "register", data);
  } catch (error) {
    return false;
  }
  // try {
  //   return axios.post(restBaseApi + "Member", data);
  // } catch (error) {
  //   console.log(error);
  //   return true;
  // }
};

export const sendSignupEmail = (email: string) => {
  try {
    return axios.post(
      restBaseApi + "email/regist",
      { m_email: email }, // )
      { headers: { Authorization: token } }
    ); // 사용자 token 부분은 추후 삭제해야함.
  } catch (error) {
    console.log(error);
    return true;
  }
};

interface Ilogin {
  email: string;
  password: string;
}
export const localLogin: ({
  email,
  password
}: Ilogin) => false | Promise<AxiosResponse<any>> = ({
  email,
  password
}: Ilogin) => {
  let data = {
    password: password,
    username: email
  };
  try {
    console.log(restBaseApi, data);
    return axios.post(restBaseApi + "authenticate", data);
  } catch (error) {
    return false;
  }
};

/*
★☆★☆ localLogin 과 호출하는 API가 똑같음. 무슨용도인지 확인 바람.
*/
export const checkStatus = (data: { email: string; password: string }) => {
  try {
    return axios.post(restBaseApi + "authenticate", {
      password: data.password,
      username: data.email
    });
  } catch (error) {
    return true;
  }
};

export const googleLogin = (id_token: string) => {
  try {
    return axios.post(restBaseApi + "loginByGoogle", id_token);
  } catch (error) {
    return true;
  }
};

/*
    ☆★☆★ 구현 필요
*/
export const logout = () => {
  try {
    return axios.post("/api/auth/logout");
  } catch (error) {
    return true;
  }
};

export const emailValidate = (email: string, key: string) => {
  try {
    // http://13.124.127.232:8080/A205/email/enter?m_email=pjh5929@naver.com&m_key=m7OSjPN0jpGOTlTCM0QR
    return axios.get(
      restBaseApi + "email/enter?m_email=" + email + "&m_key=" + key
    );
  } catch (error) {
    return true;
  }
};

// 비밀번호 찾기 메일 전송
export const changePasswordEmailSend = async (email: string) => {
  let response = await axios.post(
    restBaseApi + "email/change",
    { m_email: email },
    { headers: { Authorization: token } }
  ); // 사용자 token 부분은 추후 삭제해야함.
  return response.data;
};

// 비밀번호 변경
// http://13.124.127.232:8080/A205/changepassword/password?passtoken=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwamg1OTI5QG5hdmVyLmNvbSIsImF1ZCI6IjQ0IiwiaXNzIjoicGpoNTkyOSIsImV4cCI6MTU4MTY0NzYzNCwiaWF0IjoxNTgxNjQ3MzM0fQ.CqtvWGp70ccIPR20k_wb2ZTH7zTy-JdogEokB6PrsVjA6E-j7CtAFF_GvWkf9WzTiNJWB8VAJnIyBgMILixCBQ
export const changePassword = async (
  passwordToken: string,
  password: string
) => {
  let data = { token: passwordToken, password: password };
  let response = await axios.post(restBaseApi + "email/password", data);
  return response.data;
};
