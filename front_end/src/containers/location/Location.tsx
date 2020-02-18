import React, { Component } from "react";
// 직접 제작한 Component
import Map from "components/map/Map";
import VolInfo from "components/map/VolInfo";
import ActionButton from "components/button/ActionButton";

// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as volActions from "redux/modules/vol";

interface Props {
  VolActions: typeof volActions;
}
interface State {
  height: number;
  width: number;
}

//constructor -> render -> componentDidMount -> render
class Location extends Component<Props, State> {
  state = { width: window.innerWidth, height: (window.innerHeight - 345) };
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: (window.innerHeight - 345) });
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }
  render() {
    const { height, } = this.state;
    return (
      <div style={{ height: height }}>
        <Map />
        <VolInfo />
      </div>
    );
  }
}

export default connect(
  () => {
    return {};
  },
  dispatch => ({
    VolActions: bindActionCreators(volActions, dispatch)
  })
)(Location);
