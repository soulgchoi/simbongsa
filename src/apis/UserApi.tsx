/*
 User API 예시
 */
import axios, { AxiosResponse, AxiosError } from "axios";
interface requestLoginData {
  email: string;
  password: string;
}
const requestLoginFunction = (
  data: requestLoginData,
  callback: (response: AxiosResponse<any>) => void,
  errorCallback: (error: AxiosError<any>) => void
) => {
  //백앤드와 로그인 통신하는 부분
  let url = "http://" + "http://70.12.247.34:8080" + "/account/login";
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
  ) => requestLoginFunction(data, callback, errorCallback)
};

export default UserApi;
