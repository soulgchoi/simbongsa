/*
 User API 예시
 */
import axios, { AxiosResponse, AxiosError } from "axios";
interface requestLoginData {
  email: string;
  password: string;
}
interface requestJoinData {
  email: string;
  password: string;
}
const requestLogin = (
  data: requestLoginData,
  callback: (response: AxiosResponse<any>) => void,
  errorCallback: (error: AxiosError<any>) => void
) => {
  //백앤드와 로그인 통신하는 부분
  let url = "http://" + "localhost:8080" + "/account/login";
  axios
    .post(url, data)
    .then(response => {
      callback(response);
      console.log(response);
    })
    .catch(error => {
      errorCallback(error);
    });
};

const UserApi = {
  requestLogin: (
    data: requestLoginData,
    callback: (response: AxiosResponse<any>) => void,
    errorCallback: (error: AxiosError<any>) => void
  ) => requestLogin(data, callback, errorCallback)
};

export default UserApi;
