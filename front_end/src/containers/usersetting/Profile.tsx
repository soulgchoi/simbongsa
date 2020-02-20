import React, { Component } from "react";
import { Container, Button, Image, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { List } from "immutable";
import * as PostingApi from "lib/api/PostingApi";
import * as UsergApi from "lib/api/UserApi";
interface Props {
  mId: string;
  userId: string;
}
interface State {
  selectedFiles: any[];
}

class Profile extends Component<Props, State> {
  state = { selectedFiles: [] };
  componentDidMount() {
    const { userId } = this.props;
    let data = UsergApi.getUserInfo(userId);
    console.log("유저 정보", data);
  }
  handleFileSelect = (e: any) => {
    var id = e.target.id;
    var value = e.target.files;
    console.log(value[0]);
    this.setState({ selectedFiles: [value[0]] });
    // this.setState({ selectedFiles: newFileList });
  };

  handleSubmit = async (e: any) => {
    e.preventDefault();
    const { selectedFiles } = this.state;
    const { mId } = this.props;
    const file = new FormData();
    console.log("선택된 파일들", selectedFiles);
    if (selectedFiles.length > 0) {
      file.append("file", selectedFiles[0]);
    }
    console.log("파일", file);
    let data = await PostingApi.uploadProfileImage(mId, file);
    console.log("업로드 파일 결과", data);
    // this.props.history.push(`/${v_id}/postinglist`);
    // this.goListPage();
  };
  render() {
    const { selectedFiles } = this.state;
    console.log("오오오오", selectedFiles);
    return (
      <div>
        <Container>
          프로필 사진 선택<br></br>
          <Form>
            <input
              type="file"
              id="files"
              multiple
              accept="image/*"
              onChange={this.handleFileSelect}
            />
            <Button onClick={this.handleSubmit}>프로필 사진 등록하기</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default connect(
  ({ user }: any) => ({
    mId: user.get("loggedInfo").get("m_id"),
    userId: user.getIn(["loggedInfo", "userId"])
  }),
  dispatch => ({})
)(Profile);
