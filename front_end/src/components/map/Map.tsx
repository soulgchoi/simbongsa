import React, { Component } from "react";
import iconSrc from "assets/images/location_marker.svg";

// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as volActions from "redux/modules/vol";

declare global {
  interface Window {
    kakao: any; // 이걸 선언하지 않으면 아래 코드에서 window.kakao를 찾지 못함.
  }
}
interface Props {
  init_location: {
    y: number;
    x: number;
  };
  volunteers: any;
}

interface State {}

class Map extends Component<Props, State> {
  state = {};

  render() {
    // 카카오 맵을 로딩하는 과정 시작
    const { init_location, volunteers } = this.props;
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
      process.env.REACT_APP_KAKAO_MAP_KEY;
    document.head.appendChild(script);
    // 카카오 맵을 로딩하는 과정 끝

    // onload() :  위의 카카오맵 스크립트를 documnet에 포함 한 후 콜백 함수 실행
    script.onload = () => {
      // maps.load() : 지도가 로딩된 이후에 콜백 함수 실행
      window.kakao.maps.load(function() {
        let container = document.getElementById("map");
        // options : 지도의 현재 위치, 확대 크기
        let options = {
          center: new window.kakao.maps.LatLng(
            // init_location.y,
            // init_location.x
            37.4730725331551,
            126.703563159448
          ), // (y,x)
          level: 3
        };
        let map = new window.kakao.maps.Map(container, options); // 맵을 만듦
        // console.log("자원봉사: ", volunteers);
        // console.log("시작위치: ", init_location.y, init_location.x);
        makeMarker(volunteers, map); // (봉사정보 객체 리스트, 마커를 표시할 맵) 을 인풋으로 주면 맵에 마커가 표시됩니다.
        // makeMarker(volunteer의 y좌표(36 정도로 시작), voluteer의 x좌표(126 정도로 시작), map); // (y, x, 마커를 표시할 맵) 을 인풋으로 주면 맵에 마커가 표시됩니다.
      });
    };
    return (
      <div>
        <div id="map" style={{ width: "100%", height: "70vh" }} />
      </div>
    );
  }
}

function makeMarker(volunteers: [], map: any) {
  const { kakao } = window;
  var imageSrc = iconSrc, // 마커이미지의 주소입니다
    imageSize = new window.kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
    imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  let positions: { content: any; latlng: { y: number; x: number } }[] = [];
  volunteers.forEach(volunteer => {
    positions.push({ content: volunteer, latlng: { y: 0, x: 0 } });
  });
  positions[0].latlng = new kakao.maps.LatLng(
    37.4730725331551,
    126.703563159448
  );

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  let markerImage = new window.kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );

  for (var i = 0; i < positions.length; i++) {
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: positions[i].latlng, // 마커의 위치
      image: markerImage
    });
  }

  // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
  var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

  // 인포윈도우를 생성합니다
  var infowindow = new window.kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemoveable
  });

  // 마커에 클릭이벤트를 등록합니다
  window.kakao.maps.event.addListener(marker, "click", function() {
    // 마커 위에 인포윈도우를 표시합니다
    volActions.clickVol(1);
    infowindow.open(map, marker);
  });
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
)(Map);
