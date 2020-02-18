import axios, { AxiosResponse } from "axios";
import { List } from "immutable";
import storage from "lib/storage";
import jwt from "jsonwebtoken";
const restBaseApi = process.env.REACT_APP_REST_BASE_API!;



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
