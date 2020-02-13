import axios, { AxiosResponse } from "axios";
import { List } from 'immutable'
//const restBaseApi = "http://70.12.247.34:8080/" // jwt 최신
// const restBaseApi = "http://70.12.247.87:8080/"; // 이신호
// const restBaseApi = "http://13.124.127.232:8080/A205/"; // AWS
//const restBaseApi = "http://70.12.247.34:8080/"; // 박정환
const restBaseApi = "http://70.12.247.126:8080/"; // 김동주
export const checkEmailExists = (email: string) => {
  try {
    console.log("API email check : ", email);
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
    console.log("여기까지 왔다 ", id_token);
    return axios.post(restBaseApi + "loginByGoogle", id_token);
  } catch (error) {
    return true;
  }
};

export const logout = () => {
  try {
    return axios.post("/api/auth/logout");
  } catch (error) {
    return true;
  }
};
interface Iprefer {
  age: any
  bgnTm: any
  endTm: any
  preferCategory: any
  preferRegion: any
  userId: any
}

export const localPreferRegister: ({
  age,
  bgnTm,
  endTm,
  preferCategory,
  preferRegion,
  userId
}: Iprefer) => false | Promise<AxiosResponse<any>> = ({
  age,
  bgnTm,
  endTm,
  preferCategory,
  preferRegion,
  userId
}: Iprefer) => {
    let data = {
      m_age: age,
      m_bgnTm: bgnTm,
      m_endTm: endTm,
      prefer_category: preferCategory,
      prefer_region: preferRegion
    };
    try {
      console.log("체크 : ", data);
      return axios.patch(restBaseApi + `rest/Member/${userId}`, data);
    } catch (error) {
      return false;
    }
    // try {
    //   return axios.post(restBaseApi + "Member", data);
    // } catch (error) {
    //   console.log(error);
    //   return true;
    // }
  }


export const localPreferInfo = (userId: string) => {
  try {
    console.log("userId ", restBaseApi + `rest/Member/${userId}/PreferDetail`);
    return axios.get(restBaseApi + `rest/Member/${userId}/PreferDetail`);
  } catch (error) {
    console.log(error);
    return false;
  }
};