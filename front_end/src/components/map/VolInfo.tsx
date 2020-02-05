import React, { Component } from "react";
import "assets/mycss/location.scss";

//redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as volActions from "redux/modules/vol";

interface Props {
  // clickedVolId: number;
  selectedVolunteer: any;
}

interface State {}

class VolInfo extends Component<Props, State> {
  state = {};

  render() {
    const { selectedVolunteer } = this.props;
    console.log("VolInfo.tsx", selectedVolunteer.toJS());
    return <div className="vol--info">상세정보에요 {selectedVolunteer}</div>;
  }
}

export default connect(
  (state: any) => {
    // console.log("state : ", state.vol.toJS());
    return {
      selectedVolunteer: state.vol.get("selectedVolunteer") // store에 있는 state를 this.pros로 연결
    };
  },
  dispatch => ({
    VolActions: bindActionCreators(volActions, dispatch)
  })
)(VolInfo);
