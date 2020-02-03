import axios, { AxiosResponse, AxiosError } from "axios";
interface volunteer {
    id: number;
    status: number;
    many: number;
    bgnTm: number;
    endTm: number;
    location: string;
    adult: number;
    young: number;
    mBgnD: number;
    mEndD: number;
    pBgnD: number;
    pEndD: number;
    title: string;
    url: string;
}
const requestVol = (
  callback: (response: AxiosResponse<any>) => void,
  errorCallback: (error: AxiosError<any>) => void
) => {
  let url = "http://localhost:3001/volunteer";
  axios
    .get(url)
    .then(response => {
      callback(response);
      console.log(response);
    })
    .catch(error => {
      errorCallback(error);
    });
};

const VolApi = {
  requestVol: (
    callback: (response: AxiosResponse<any>) => void,
    errorCallback: (error: AxiosError<any>) => void
  ) => requestVol(callback, errorCallback)
};

export default VolApi;
