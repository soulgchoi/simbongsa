import axios from "axios";
import storage from "lib/storage";

// const restBaseApi = "http://localhost:3002/post";
const restBaseApi = "http://70.12.247.87:8080/"; // 이신호
// const restBaseApi = "http://i02a205.p.ssafy.io:8080/A205/"

/* ★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆
새로 발급 받은 토큰은 제대로 동작하지 않아서 기존에 발급 받은 토큰 중 하나를 임시로 이용함. 
★☆★☆★☆★☆★☆★☆★☆★☆ */
const token =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxd2VydEBuYXZlci5jb20iLCJhdWQiOiIyNiIsImlzcyI6InF3ZXJ0IiwiZXhwIjoxNjEzMTc4MTQ4LCJpYXQiOjE1ODE2NDIxNDh9.qiTNnygKG972ykS6jRswyMIP6mfbnEFhCZraN-RUb3xJlSDbS46SNNQY3g9adOojGWS5XuFjdXXS7crybvkYVA";

// 토큰 인증 이슈가 해결 되면 이 주석과 위 토큰을 삭제하고, storage 에 저장된 토큰을 사용.
// let token = storage.get('token');

export const postPosting = (posting: FormData) => {
  try {
    return axios.post(restBaseApi, posting, {
      headers: { Authorization: token }
    });
  } catch (err) {
    console.log(err);
    return true;
  }
};

export const postReview = (posting: FormData) => {
  try {
    return axios.post(restBaseApi, posting, {
      headers: { Authorization: token }
    });
  } catch (err) {
    console.log(err);
    return true;
  }
};

export const getPosts = (postNum: number) => {
  try {
    return axios.get(restBaseApi + "rest/Post/" + postNum, {
      headers: { Authorization: token }
    });
  } catch (err) {
    console.log(err);
    return true;
  }
};
