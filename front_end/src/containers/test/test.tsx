import React, { Component } from "react";
import UserProfile from "components/user/profile/UserProfile";
import axios from "axios";
interface Props {}
interface State {}

export default class test extends Component<Props, State> {
  state = {};

  render() {
    const test: any = async () => {
      try {
        return axios.get(
          process.env.REACT_APP_REST_BASE_API + "/rest/PostFeed/60/10/1",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaW1oYWtzdUBuYXZlci5jb20iLCJhdWQiOiI2MCIsImlzcyI6ImxpbWhha3N1IiwiZXhwIjoxNjEzNDUwNzQ1LCJpYXQiOjE1ODE5MTQ3NDV9.2FYRXeQzoHTa9BQFaTx4rkGoWLP7MF2fpU4IsDGIoGOlbAkzhBVsCAmIEDsW_AV9SlqlmBcBTnEbpTBvfx_s5A"
            }
          }
        );
      } catch (error) {
        console.log(error);
        return false;
      }
    };
    const countBreeds = async () => {
      const breeds = await test();
      console.log(breeds.data);
    };
    countBreeds();
    return <div></div>;
  }
}
