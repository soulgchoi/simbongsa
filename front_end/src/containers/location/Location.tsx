import React, { Component, ReactElement } from "react";
import "assets/mycss/location.scss";
import iconSrc from "assets/images/location_marker.svg";
import { Map } from "immutable"; // json 형태의 객체 -> Map으로 만들어 immutable 속성 유지
import axios from "axios";
// 직접 제작한 Component
import VolMap from "components/map/VolMap";
import VolInfo from "components/map/VolInfo";
import ActionButton from "components/button/ActionButton";

// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as volActions from "redux/modules/vol";
import storage from "lib/storage";
import Vol from "containers/mainpage/Vol";

interface Props {
  volunteers: any;
  VolActions: typeof volActions;
  selectedVolunteer: any;
  initLocation: any;
}
interface State {}
//constructor -> render -> componentDidMount -> render
class Location extends Component<Props, State> {
  componentDidMount() {
    console.log("componentDidMout");
    this.getVols();
  }
  getVols = () => {
    const { VolActions } = this.props;
    try {
      VolActions.getVolList(); // 성공하면 store의 volunteers에 저장돼있음
    } catch (e) {
      console.log(e);
    }
  };
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }
  setLocation = () => {
    const { VolActions } = this.props;
    window.navigator.geolocation.getCurrentPosition(position => {
      VolActions.setInitLocation({
        y: position.coords.latitude,
        x: position.coords.longitude
      });
    });
    // this.setState(prevState => ({
    //   location: {
    //     // object that we want to update
    //     ...prevState.location, // keep all other key-value pairs
    //     y: y,
    //     x: x // update the value of specific key
    //   }
    // }));
  };

  render() {
    console.log("render");
    const { VolActions } = this.props;
    const volunteers = this.props.volunteers;
    const initLocation = this.props.initLocation;
    const selectedVolunteer = this.props.selectedVolunteer;
    // console.log("Location.tsx 의 render() 의 자원봉사 : ", volunteers);
    // console.log("selected Volddd", selectedVolunteer);
    return (
      <div className="user" id="login">
        <div className="wrapC">
          <h1 className="title">봉사 위치</h1>
          <ActionButton placeholder="내위치" action={this.setLocation} />
          <VolMap
            initLocation={initLocation}
            volunteers={volunteers}
            VolActions={VolActions}
          ></VolMap>
          <div className="main--text">
            {!selectedVolunteer.v_id && (
              <div id="text">
                지도에서
                <b id="bold">
                  위치
                  <span id="image">
                    <img
                      src={iconSrc}
                      alt="마커아이콘"
                      width="64"
                      height="69"
                    />
                  </span>
                </b>
                를 클릭하면 봉사정보가 나와요
              </div>
            )}
            <VolInfo selectedVolunteer={selectedVolunteer} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ vol }: any) => {
    // console.log("connect 호출");
    // console.log("vol", vol.toJS());
    return {
      volunteers: vol.get("volunteers"), // store에 있는 state를 this.pros로 연결
      selectedVolunteer: vol.get("selectedVolunteer"),
      initLocation: vol.get("initLocation"),
      map: vol.get("map")
    };
  },
  dispatch => ({
    VolActions: bindActionCreators(volActions, dispatch)
  })
)(Location);
