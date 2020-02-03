import React, { Component } from "react";
import Map from "components/map/Map";
import "assets/mycss/location.scss";
import iconSrc from "assets/images/location_marker.svg";
interface Props {}
interface State {}

export default class Location extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="user" id="login">
        <div className="wrapC">
          <h1 className="title">봉사 위치</h1>
          <Map></Map>
          <div className="main--text">
            <div id="text">
              지도에서 <b>위치</b>를 클릭하면 봉사정보가 나와요
              <div id="image">
                <img src={iconSrc} alt="마커아이콘" width="64" height="69" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
