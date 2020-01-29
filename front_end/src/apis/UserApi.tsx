import axios from "axios";
const restBaseApi = "http://70.12.247.34:8080";
export const checkEmailExists = (email: string) => {
  try {
    return axios.get(restBaseApi + "CheckEmail/" + email);
  } catch (error) {
    return false;
  }
};
export const checkUsernameExists = (username: string) => {
  try {
    return axios.get(restBaseApi + "CheckId/" + username);
  } catch (error) {
    return true;
  }
};

export const localRegister = (
  email: string,
  username: string,
  password: string
) => {
  try {
    return axios.post(restBaseApi + "Member", {
      email,
      username,
      password
    });
  } catch (error) {
    return true;
  }
};
export const localLogin = (email: string, password: string): boolean => {
  axios
    .post(restBaseApi + "/login.do", {
      m_userid: email,
      m_password: password
    })
    .then(response => {
      return response.data.data;
    })
    .catch(error => {
      return error.data.data;
    });
  return false;
};

export const checkStatus = () => {
  try {
    return axios.get("/api/auth/check");
  } catch (error) {
    return true;
  }
};
export const logout = () => {
  try {
    return axios.post("/api/auth/logout");
  } catch (error) {
    return true;
  }
};
