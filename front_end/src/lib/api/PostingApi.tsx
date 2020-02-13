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

export const getPosts = (postNum: number) => {
    try {
        return axios.get("http://i02a205.p.ssafy.io:8080/A205/rest/Post/" + postNum)
    } catch (err) {
        console.log(err)
        return true;
    }
    

}