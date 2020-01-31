import axios from "axios";
const restBaseApi = "http://70.12.247.87:8080/rest/";
export const checkEmailExists = (email: any) => {
  axios
    .get(restBaseApi + "CheckEmail/" + email)
    .then(response => {
      console.log("ax response:", response);

      return true;
    })
    .catch(error => {
      console.log("ax error:", error);
      return false;
    });
  // try {
  //   return axios.get(restBaseApi + "CheckEmail/" + email);
  // } catch (error) {
  //   return true;
  // }
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
export const localLogin = (email: string, password: string) => {
  try {
    return axios.post("/api/auth/login/local", { email, password });
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
