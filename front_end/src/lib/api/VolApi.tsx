import axios from "axios";
// const restBaseApi = "http://70.12.247.87:8080"; // 이신호
const restBaseApi = "http://70.12.247.34:8080"; // 박정환
// const restBaseApi = "http://70.12.247.126:8080"; // 김동주

export const getVolById = (id: string) => {
  try {
    return axios.get(restBaseApi + "/vol/detail/" + id);
  } catch (error) {
    return true;
  }
};
