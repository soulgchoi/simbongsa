import React, { Component } from "react";
import GoBackButton from "components/button/GoBackButton";
import { Container, Button } from "semantic-ui-react";
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
    let newFileList: any[] = [];
    newFileList.push(value[0]);
    console.log("new", newFileList);
    this.setState({ selectedFiles: newFileList });
  };
  render() {
    const { selectedFiles } = this.state;
    console.log("오오오오", selectedFiles);
    return (
      <div>
        <Container>
          <input
            type="file"
            id="files"
            accept="image/*"
            onChange={this.handleFileSelect}
            value={selectedFiles}
          />
        </Container>
      </div>
    );
  }
}
