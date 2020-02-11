import React, { Component } from "react";
import "assets/mycss";

interface Props {
  volunteer: {
    v_Auth: number;
    v_pStatus: number;
  }
}
interface State {
<<<<<<< HEAD
    visibility: string;
    isCert: string;
    isCertClass: string;
    isFull: string;
    isFullClass: string;
}

export default class CertLabel extends Component<Props, State> {
   
  printFunc(): void{
    if (this.props.volunteer.v_Auth > 0) {
      this.setState({isCert: "인증"})
      this.setState({isCertClass: "tag iscert"})
    }
    if (this.props.volunteer.v_pStatus == 3) {
        this.setState({isFull: "모집완료"})
        this.setState({isFullClass: "tag full"})
    } else if (this.props.volunteer.v_pStatus == 2) {
        this.setState({isFull: "모집중"})
        this.setState({isFullClass: "tag n-full"})
    } else if (this.props.volunteer.v_pStatus == 1) {
        this.setState({isFull: "모집대기"})
        this.setState({isFullClass: "tag w-full"})
    }
  }
  
  visibilityFunc(): void {
    if (this.state.isCert === "인증") {
      this.setState({visibility: "true"})
=======
  visibility: string;
}

export default class CertLabel extends Component<Props, State> {
  state = {
    visibility: ""
  };

  componentWillMount() {
    if (this.props.isCert === "인증") {
      this.setState({ visibility: "true" });
>>>>>>> ca2c51cf04e81e9795f14d38caa6eac539332395
    } else {
      this.setState({ visibility: "false" });
    }
  }

  componentWillMount() {
    this.printFunc()
  }

  componentDidMount() {
    this.visibilityFunc()

  }

  render() {
    return (
<<<<<<< HEAD


      <div style={{display: 'inline'}}>
        <div className={this.state.isCertClass} id={this.state.visibility}>
          {this.state.isCert}
        </div>
        <div className={this.state.isFullClass}>
          {this.state.isFull}
        </div>
=======
      <div style={{ display: "inline" }}>
        <div className={this.props.isCertClass} id={this.state.visibility}>
          {this.props.isCert}
        </div>
        <div className={this.props.isFullClass}>{this.props.isFull}</div>
>>>>>>> ca2c51cf04e81e9795f14d38caa6eac539332395
      </div>
    );
  }
}
