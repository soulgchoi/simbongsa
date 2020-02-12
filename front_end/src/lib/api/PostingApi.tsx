import axios from "axios";
const restBaseApi = "http://localhost:3002/post";

export const postPosting = (posting: FormData) => {
    try {
        return axios.post(restBaseApi, posting);
    } catch(err) {
        console.log(err)
        return true;
    }
};

export const postReview = (posting: FormData) => {
    try {
        return axios.post(restBaseApi, posting)
    } catch (err) {
        console.log(err)
        return true;
    }
};