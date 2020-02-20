import React, { Component } from "react";
import { Container, Button, Image } from "semantic-ui-react";
import { List } from "immutable";
interface Props {}
interface State {
  selectedFiles: any[];
}

export default class Profile extends Component<Props, State> {
  state = { selectedFiles: [] };
  handleFileSelect = (e: any) => {
    var id = e.target.id;
    var value = e.target.files;
    console.log(value[0]);
    this.setState({ selectedFiles: [value[0]] });
    // this.setState({ selectedFiles: newFileList });
  };
  render() {
    const { selectedFiles } = this.state;
    console.log("오오오오", selectedFiles);
    return (
      <div>
        <Container>
          프로필 사진 선택<br></br>
          <input
            type="file"
            id="files"
            multiple
            accept="image/*"
            onChange={this.handleFileSelect}
          />
        </Container>
      </div>
    );
  }
}
