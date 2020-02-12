import React, { Component } from "react";
import "assets/mycss";

interface Props {
  volunteer: {
    v_Auth: number;
    v_pStatus: number;
  }
}
interface State {
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
    console.log(this.state.isCert)
    if (this.state.isCert === "인증") {
      this.setState({visibility: "true"})
    } else {
      this.setState({ visibility: "false" });
    }
  }

  componentWillMount() {
    console.log(this.props.volunteer)
    this.printFunc()
  }

  componentDidMount() {
    this.visibilityFunc()

  }

  render() {
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
