import axios from "axios";
const restBaseApi = "http://i02a205.p.ssafy.io:8080/A205";
// const restBaseApi = "http://70.12.247.87:8080"; // 이신호
// const restBaseApi = "http://70.12.247.126:8080"; // 이신호


export const getVolDetail = (id: number) => {
  try{
    return axios.get(restBaseApi + "/vol/detail/" + id)
  } catch (error) {
    console.log(error);
    return true;
  }
};

export const getVolList = (pgNum: number) => {
  try {
    return axios.get(restBaseApi + "/vol/titles/10/" + pgNum,
    {headers: {
      'Access-Control-Allow-Origin': "*",
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxd2VydEBuYXZlci5jb20iLCJhdWQiOiIyNiIsImlzcyI6InF3ZXJ0IiwiZXhwIjoxNjEzMTc4MTQ4LCJpYXQiOjE1ODE2NDIxNDh9.qiTNnygKG972ykS6jRswyMIP6mfbnEFhCZraN-RUb3xJlSDbS46SNNQY3g9adOojGWS5XuFjdXXS7crybvkYVA',
  }
  }
    );
  } catch (error) {
    console.log(error);
    return true;
  }
};
