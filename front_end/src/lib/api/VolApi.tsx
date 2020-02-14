import axios from "axios";
import user from "redux/modules/user";
// const restBaseApi = "http://13.124.127.232:8080/A205"; // AWS
const restBaseApi = "http://70.12.247.87:8080"; // 이신호
// const restBaseApi = "http://70.12.247.34:8080"; // 박정환
// const restBaseApi = "http://70.12.247.126:8080"; // 김동주

export const getVolById = (token: string, id: number) => {
  try {
    // console.log("VolApi.tsx의 getVolById() 호출 id : " + id);
    return axios
      .create({ headers: { Authorization: "Baerer " + token } })
      .get(restBaseApi + "/vol/detail/" + id);
  } catch (error) {
    return true;
  }
};

export const getVolList = () => {
  try {
    // console.log("VolApi.tsx의 getVolList() 호출");
    return axios.get(restBaseApi + "/vol/titles/1000/1"); // 1/1  (페이지당 한개)/(1페이지)
  } catch (error) {
    console.log("에러남");
    return true;
  }
};

export const getVolListByUserId = (userId: string) => {
  try {
    return axios.get(restBaseApi + "/rest/Member/" + userId + "/Vote");
  } catch (error) {
    return true;
  }
};
