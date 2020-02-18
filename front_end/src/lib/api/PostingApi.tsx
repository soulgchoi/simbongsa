import axios from "axios";
import storage from "lib/storage";

const restBaseApi = process.env.REACT_APP_REST_BASE_API!;

export const postPosting = (posting: FormData) => {
  try {
    const token = "Bearer " + storage.get("token");
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
    const token = "Bearer " + storage.get("token");
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
    const token = "Bearer " + storage.get("token");
    return axios.get(restBaseApi + "rest/Post/" + postNum, {
      headers: { Authorization: token }
    });
  } catch (err) {
    console.log(err);
    return true;
  }
};
