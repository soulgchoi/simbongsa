import axios from "axios";
// const restBaseApi = "http://70.12.247.34:8080";
const restBaseApi = "http://70.12.247.87:8080"; // 이신호
export const checkEmailExists = (email: string) => {
  try {
    console.log("체크 : ", email);
    return axios.get(restBaseApi + "CheckEmail/" + email);
  } catch (error) {
    return false;
  }
};
export const checkUsernameExists = (userid: string) => {
  // axios
  //   .get(restBaseApi + "CheckId/" + userid)
  //   .then(response => {
  //     console.log("ax response:", response);

  //     return true;
  //   })
  //   .catch(error => {
  //     console.log("ax error:", error);
  //     return false;
  //   });
  // };
  try {
    return axios.get(restBaseApi + "CheckId/" + userid);
  } catch (error) {
    return true;
  }
};

export const localRegister = (
  email: string,
  userid: string,
  password: string
) => {
  let data = {
    m_email: email,
    m_userid: userid,
    m_password: password
  };
  axios
    .post(restBaseApi + "Member", data)
    .then(response => {
      console.log("ax response:", response);
      return true;
    })
    .catch(error => {
      console.log("ax error:", error);
      return false;
    });
  // try {
  //   return axios.post(restBaseApi + "Member", data);
  // } catch (error) {
  //   console.log(error);
  //   return true;
  // }
};
export const localLogin = (data: { email: string; password: string }) => {
  try {
    return axios.post(restBaseApi + "/login.do", {
      m_userid: data.email,
      m_password: data.password
    });
  } catch (error) {
    return true;
  }
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
