import axios from "axios";
// const restBaseApi = "http://localhost:3002/post";
// const restBaseApi = "http://70.12.247.87:8080/"; // 이신호
const restBaseApi = "http://i02a205.p.ssafy.io:8080/A205/"



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
        return axios.get(restBaseApi + "rest/Post/" + postNum, )
    } catch (err) {
        console.log(err)
        return true;
    }
    

}