import axios from "axios";
import storage from 'lib/storage';

//const restBaseApi = "http://i02a205.p.ssafy.io:8080/A205";
// const restBaseApi = "http://13.124.127.232:8080/A205"; // AWS
// const restBaseApi = "http://70.12.247.87:8080"; // 이신호

//const restBaseApi = "http://13.124.127.232:8080/A205"; // AWS
const restBaseApi = "http://70.12.247.87:8080"; // 이신호
// const restBaseApi = "http://70.12.247.34:8080"; // 박정환
// const restBaseApi = "http://70.12.247.126:8080"; // 김동주

/* ★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆
새로 발급 받은 토큰은 제대로 동작하지 않아서 기존에 발급 받은 토큰 중 하나를 임시로 이용함. 
★☆★☆★☆★☆★☆★☆★☆★☆ */
const token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxd2VydEBuYXZlci5jb20iLCJhdWQiOiIyNiIsImlzcyI6InF3ZXJ0IiwiZXhwIjoxNjEzMTc4MTQ4LCJpYXQiOjE1ODE2NDIxNDh9.qiTNnygKG972ykS6jRswyMIP6mfbnEFhCZraN-RUb3xJlSDbS46SNNQY3g9adOojGWS5XuFjdXXS7crybvkYVA"

// 토큰 인증 이슈가 해결 되면 이 주석과 위 토큰을 삭제하고, storage 에 저장된 토큰을 사용.
// let token = storage.get('token');

export const getVolListBySearch = (name: any): any => {
  try {
    // console.log("VolApi.tsx의 getVolList() 호출");
    return axios.get(restBaseApi + `/vol/titles/4000/1/filtering/?vol_title=${name}`, { headers: { "Authorization": token } }); // 1/1  (페이지당 한개)/(1페이지)
  } catch (error) {
    console.log("에러남");
    return true;
  }
};

export const getVolDetail = (id: number) => {
  try {
    return axios
      .get(restBaseApi + "/vol/detail/" + id, { headers: { "Authorization": token } })
  } catch (error) {
    console.log(error);
    return true;
  }
}

export const getVolListByPage = (pgNum: number) => {
  try {
    return axios
      .get(restBaseApi + "/vol/titles/10/" + pgNum, { headers: { "Authorization": token } });
  } catch (error) {
    console.log(error);
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
