import React, { Component } from "react";
import "assets/mycss";
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
  location: {
    y: number;
    x: number;
  };
}

//constructor -> render -> componentDidMount -> render
class Location extends Component<Props, State> {
  setMyLocation = () => {
    const { VolActions } = this.props;
    window.navigator.geolocation.getCurrentPosition(position => {
      VolActions.setCurrentLocation({
        y: position.coords.latitude,
        x: position.coords.longitude
      });
    });
  };
  render() {
    console.log("render");
    return (
      <div className="user" id="login">
        <div className="wrapC">
          <h1 className="title">봉사 위치</h1>
          <ActionButton placeholder="내 위치" action={this.setMyLocation} />
          <Map />
          <VolInfo />
        </div>
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
