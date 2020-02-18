import axios, { AxiosResponse } from "axios";
import { List } from "immutable";
import storage from "lib/storage";
<<<<<<< HEAD

const restBaseApi = process.env.REACT_APP_REST_BASE_API!;
=======
import jwt from "jsonwebtoken";
const restBaseApi = "http://i02a205.p.ssafy.io:8080/A205/";
// const restBaseApi = "http://70.12.247.87:8080/"; // 이신호
// const restBaseApi = "http://70.12.247.34:8080/"; // 박정환
// const restBaseApi = "http://70.12.247.126:8080/"; // 김동주

/* ★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆
새로 발급 받은 토큰은 제대로 동작하지 않아서 기존에 발급 받은 토큰 중 하나를 임시로 이용함. 
★☆★☆★☆★☆★☆★☆★☆★☆ */
// const token =
//   "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxd2VydEBuYXZlci5jb20iLCJhdWQiOiIyNiIsImlzcyI6InF3ZXJ0IiwiZXhwIjoxNjEzMTc4MTQ4LCJpYXQiOjE1ODE2NDIxNDh9.qiTNnygKG972ykS6jRswyMIP6mfbnEFhCZraN-RUb3xJlSDbS46SNNQY3g9adOojGWS5XuFjdXXS7crybvkYVA";

// 토큰 인증 이슈가 해결 되면 이 주석과 위 토큰을 삭제하고, storage 에 저장된 토큰을 사용.
>>>>>>> eadf41bc846a20738b2ea109267104b7b6e66fe2

/// 팔로우 관련 API 시작
export const getUserFollower = async (userId: string) => {
  const token = "Bearer " + storage.get("token");
  let response = await axios.get(
    restBaseApi + "follow/" + userId + "/followers",
    { headers: { Authorization: token } }
  );
  console.log("get follower", response);
  let list: string[] = [];
  const data = response.data.data;
  data.map((item: { m_userid: string }) => {
    list.push(item.m_userid);
  });
  console.log("list", list);
  return list;
};

export const getUserFollowing = async (userId: string) => {
  const token = "Bearer " + storage.get("token");
  let response = await axios.get(
    restBaseApi + "follow/" + userId + "/followees",
    { headers: { Authorization: token } }
  );
  console.log("get follower", response);
  let list: string[] = [];
  const data = response.data.data;
  data.map((item: { m_userid: string }) => {
    list.push(item.m_userid);
  });
  console.log("list", list);
  return list;
};

export const checkFollow = async (followerId: string, followeeId: string) => {
  const token = "Bearer " + storage.get("token");
  let response = await axios.get(
    restBaseApi +
    "isfollowing?follower_userid=" +
    followerId +
    "&followee_userid=" +
    followeeId,
    { headers: { Authorization: token } }
  );
  console.log("팔로잉체크", response.data.data);
  return response.data.data;
};

export const followUser = async (data: {
  follower_userid: string;
  followee_userid: string;
}) => {
  const token = "Bearer " + storage.get("token");
  let response = await axios.post(restBaseApi + "insertfollow/", data, {
    headers: { Authorization: token }
  });

  return response;
};

export const unfollowUser = async (data: {
  follower_userid: string;
  followee_userid: string;
}) => {
  const token = "Bearer " + storage.get("token");
  let response = await axios.post(restBaseApi + "deletefollow/", data, {
    headers: { Authorization: token }
  });
  return response;
};
/// 팔로우 관련 API 끝
interface Iprefer {
  age: any;
  bgnTm: any;
  endTm: any;
  preferCategory: any;
  preferRegion: any;
  userId: any;
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
      const token = "Bearer " + storage.get("token");
      console.log("체크 : ", data);
      return axios.patch(restBaseApi + `rest/Member/${userId}`, data, {
        headers: { Authorization: token }
      });
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

export const localPreferInfo = (userId: string) => {
  try {
    console.log("userId는 이거입니다", userId)
    const tokenTemp = storage.get("token")
    const temp: any = jwt.decode(tokenTemp);
    const userId2 = temp.iss
    const token = "Bearer " + storage.get("token");
    return axios.get(restBaseApi + `rest/Member/${userId2}/PreferDetail`, {
      headers: { Authorization: token }
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getFeedList = (mId: string, pgNum: number) => {
  try {
    console.log("mId", mId)
    const tokenTemp = storage.get("token")
    const temp: any = jwt.decode(tokenTemp);
    const mId2 = temp.aud
    const token = "Bearer " + storage.get("token");
    // console.log("겟피드리스트", restBaseApi + `rest/PostFeed/3/10/${pgNum}`);
    // return axios.get(restBaseApi + `rest/PostFeed/3/10/${pgNum}`, {
    return axios.get(restBaseApi + `rest/PostFeed/${mId2}/10/${pgNum}`, {
      headers: { Authorization: token }
    });
  } catch (error) {
    console.log(error);
    return true;
  }
};
