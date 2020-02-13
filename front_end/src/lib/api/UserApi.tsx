import axios, { AxiosResponse } from "axios";
// const restBaseApi = "http://70.12.247.87:8080/"; // 이신호
const restBaseApi = "http://13.124.127.232:8080/A205/"; // AWS
//const restBaseApi = "http://70.12.247.34:8080/"; // 박정환
// const restBaseApi = "http://70.12.247.126:8080/"; // 김동주

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

/// 팔로우 관련 API 시작

export const getUserFollower = async (token: string, userId: string) => {
  let response = await axios
    .create({ headers: { Authorization: "Baerer " + token } })
    .get(restBaseApi + "follow/" + userId + "/followers");
  console.log("get follower", response);
  let list: string[] = [];
  const data = response.data.data;
  data.map((item: { m_userid: string }) => {
    list.push(item.m_userid);
  });
  console.log("list", list);
  return list;
};

export const getUserFollowing = async (token: string, userId: string) => {
  let response = await axios
    .create({ headers: { Authorization: "Baerer " + token } })
    .get(restBaseApi + "follow/" + userId + "/followees");
  console.log("get follower", response);
  let list: string[] = [];
  const data = response.data.data;
  data.map((item: { m_userid: string }) => {
    list.push(item.m_userid);
  });
  console.log("list", list);
  return list;
};

export const checkFollow = async (
  token: string,
  followerId: string,
  followeeId: string
) => {
  let response = await axios
    .create({ headers: { Authorization: "Baerer " + token } })
    .get(
      restBaseApi +
        "isfollowing?follower_userid=" +
        followerId +
        "&followee_userid=" +
        followeeId
    );
  console.log("팔로잉체크", response.data.data);
  return response.data.data;
};

export const followUser = async (
  token: string,
  data: { follower_userid: string; followee_userid: string }
) => {
  let response = await axios
    .create({ headers: { Authorization: "Baerer " + token } })
    .post(restBaseApi + "insertfollow/", data);

  return response;
};

export const unfollowUser = async (
  token: string,
  data: { follower_userid: string; followee_userid: string }
) => {
  let response = await axios
    .create({ headers: { Authorization: "Baerer " + token } })
    .post(restBaseApi + "deletefollow/", data);
  return response;
};
/// 팔로우 관련 API 끝
