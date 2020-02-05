import React, { Component } from "react";
import "assets/mycss/location.scss";
import iconSrc from "assets/images/location_marker.svg";

// 직접 제작한 Component
import Map from "components/map/Map";
import VolInfo from "components/map/VolInfo";

// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as volActions from "redux/modules/vol";
import storage from "lib/storage";
import Vol from "containers/mainpage/Vol";

interface Props {
  volunteers: any;
  VolActions: typeof volActions;
  clickedVolId: number;
}
interface State {
  location: {
    y: number;
    x: number;
  };
}

//constructor -> render -> componentDidMount -> render
class Location extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { location: { y: 0, x: 0 } };
    window.navigator.geolocation.getCurrentPosition(position => {
      this.setLocation(position.coords.latitude, position.coords.longitude);
    });
    console.log("getVols 실행");
    this.getVols();
  }

  setLocation(y: number, x: number) {
    this.setState(prevState => ({
      location: {
        // object that we want to update
        ...prevState.location, // keep all other key-value pairs
        y: y,
        x: x // update the value of specific key
      }
    }));
  }

  getVols = async () => {
    const { VolActions } = this.props;
    try {
      console.log("getVols1", this.props.volunteers.toJS());
      await VolActions.getVolList(); // 성공하면 store의 volunteers에 저장돼있음
      console.log("getVols2", this.props.volunteers.toJS());
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const volunteers = this.props.volunteers.toJS();
    console.log("Location.tsx 자원봉사 : ", volunteers);
    return (
      <div className="user" id="login">
        <div className="wrapC">
          <h1 className="title">봉사 위치</h1>
          {/* "x": "126.743129182117",
            "y": "37.5143122532892" */}
          <Map init_location={this.state.location}></Map>
          <div className="main--text">
            <div id="text">
              지도에서
              <b id="bold">
                위치
                <span id="image">
                  <img src={iconSrc} alt="마커아이콘" width="64" height="69" />
                </span>
              </b>
              를 클릭하면 봉사정보가 나와요
            </div>
            <VolInfo />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: any) => {
    return {
      volunteers: state.vol.get("volunteers"), // store에 있는 state를 this.pros로 연결
      clickedVolId: state.vol.get("clickedVolId")
    };
  },
  dispatch => ({
    VolActions: bindActionCreators(volActions, dispatch)
  })
)(Location);
