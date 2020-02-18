import axios from "axios";
import storage from "lib/storage";

const restBaseApi = process.env.REACT_APP_REST_BASE_API!;

// let headers = {
//   // "Access-Contorl-Allow-Origin": "*",
//   // "Access-Contorl-Allow-Method": "*",
//   // "Access-Contorl-Allow-Headers": "*",
//   // "Access-Contorl-Allow-Credencial": true,
//   Authorization: ""
// };

export const getVolListBySearch = (name: any): any => {
  try {
    const token = "Bearer " + storage.get("token");
    return axios.get(
      restBaseApi + `vol/titles/4000/1/filtering/?vol_title=${name}`,
      { headers: { Authorization: token } }
    ); // 1/1  (페이지당 한개)/(1페이지)
  } catch (error) {
    console.log("에러남");
    return true;
  }
};

export const getVolDetail = (id: number) => {
  try {

    const token = "Bearer " + storage.get("token");
    return axios.get(restBaseApi + "/vol/detail/" + id, {
      headers: { Authorization: token }
    });
  } catch (error) {
    console.log(error);
    return true;
  }
};

export const getVolListByPage = (pgNum: number) => {
  try {
    const token = "Bearer " + storage.get("token");
    console.log("리스트 초기화 api");
    console.log(restBaseApi + "vol/titles/10/" + pgNum);
    return axios.get(restBaseApi + "/vol/titles/10/" + pgNum, {
      headers: { Authorization: token }
    });
  } catch (error) {
    console.log("vollistAPI error:", error);
    return true;
  }
};

export const getVolListByUserId = (userId: string) => {
  try {
    const token = "Bearer " + storage.get("token");
    console.log("여기는 잘 되는가??");
    return axios.get(restBaseApi + "/rest/Member/" + userId + "/Vote", {
      headers: { Authorization: token }
    });
  } catch (error) {
    return true;
  }
};
