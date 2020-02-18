import React from "react";
import axios from "axios";
import storage from "lib/storage";
import { useHistory } from "react-router-dom";
import GoBackButton from "components/button/GoBackButton";
let token = storage.get("token");

interface Props {
  inP_id: number;
}

class CommentForm extends React.Component<Props, {}> {
  state = {
    c_content: "",
    inP_id: ""
  };

  handleChange = (e: any) => {
    console.log(this.state.c_content);
    this.setState({
      c_content: e.target.value
    });
    console.log(this.props.inP_id);
  };

  handleClick = () => {
    axios
      .post(
        `${process.env.REACT_APP_REST_BASE_API}/rest/Comment`,
        {
          c_content: this.state.c_content,
          p_id: this.props.inP_id.toString(),
          m_id: "26"
        },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then(res => {
        this.setState({
          c_content: ""
        });
        console.log(res);
      })
      .catch(err => console.log(err));
    // this.handleBack()
  };

  // handleBack() {
  //     this.props.history.push('/');
  // }

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            value={this.state.c_content}
            onChange={this.handleChange}
          ></input>
          <button onClick={this.handleClick}>댓글 등록</button>
        </form>
      </div>
    );
  }
}

export default CommentForm;
