import axios from "axios";
const restBaseApi = "http://70.12.247.87:8080"; // 이신호

export const getVolDetail = (id: string) => {
  try {
    return axios.get(restBaseApi + "/vol/detail/" + id)
  } catch (error) {
    console.log(error);
    return true;
  }
};

export const getVolList = (pgNum: number) => {
  try {
    return axios.get(restBaseApi + "/vol/titles/10/" + pgNum);
  } catch (error) {
    console.log(error);
    return true;
  }
};
