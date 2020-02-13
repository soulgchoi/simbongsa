import React, { Component } from "react";
import "assets/mycss";

interface IProps {
  v_Auth: number;
  v_pStatus: number;
}


export default class CertLabel extends Component<IProps & any, any> {
  state = {
    visibility: "",
    isCert: "",
    isCertClass: "",
    isFull: "",
    isFullClass: ""
  }

  printFunc(): void{
    console.log(this.props.v_Auth)
    if (this.props.v_Auth > 0) {
      this.setState({isCert: "인증"})
      this.setState({isCertClass: "tag iscert"})
      this.setState({visibility: "true"})
    } else if (this.props.v_Auth === null) {
      this.setState({visibility: "false" })
    }
    if (this.props.v_pStatus == 3) {
        this.setState({isFull: "모집완료"})
        this.setState({isFullClass: "tag full"})
    } else if (this.props.v_pStatus == 2) {
        this.setState({isFull: "모집중"})
        this.setState({isFullClass: "tag n-full"})
    } else if (this.props.v_pStatus == 1) {
        this.setState({isFull: "모집대기"})
        this.setState({isFullClass: "tag w-full"})
    }
  }


  componentDidMount() {
    // console.log(this.props.volunteer)
    // console.log(this.props.v_Auth)
    this.printFunc()
  }

  render() {
    console.log(this.props)
    // this.printFunc()
    return (
      <div style={{display: 'inline'}}>
        <div className={this.state.isCertClass} id={this.state.visibility}>
          {this.state.isCert}
        </div>
        <div className={this.state.isFullClass}>
          {this.state.isFull}
        </div>
      </div>
    );
  }
}
