import React, { Component } from "react";
import normalIcon from "assets/images/location_marker.png";
import selectedIcon from "assets/images/selected_marker.png";

import { List } from "immutable";
// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as volActions from "redux/modules/vol";

declare global {
  interface Window {
    kakao: any;
  }
}

interface IProps {
  volunteers: any;
  VolActions: typeof volActions;
  currentLocation: any;
  volMap: any;
  selectedMarker: any;
}

class Map extends Component<IProps> {
  async componentDidMount() {
    console.log("componentDidMount");
    const { VolActions, volunteers, selectedMarker } = this.props;
    const currentLocation = this.props.currentLocation;
    const el = document.getElementById("map");
    const volMap = await new window.kakao.maps.Map(el, {
      center: new window.kakao.maps.LatLng(
        currentLocation.y,
        currentLocation.x
      ), // 지도의 중심좌표.
      level: 6 // 지도의 레벨(확대, 축소 정도)
    });
    window.kakao.maps.event.addListener(volMap, "click", () => {
      // 맵에서 마커가 아닌 곳을 찍었을 때 선택 정보 초기화
      VolActions.resetSelectedVol();
    });
    VolActions.setVolMap(volMap);

    getVols(VolActions); // volunteers 업데이트 하면서 업데이트 완료시점에 componentDidUpdate() 한번 호출함.
    if (volunteers.size > 0)
      makeMarker(volunteers.toJS(), volMap, VolActions, selectedMarker); // 뒤로가기로 다시 돌아왔을때 이미 volunteers가 세팅 돼있는 경우
  }

  shouldComponentUpdate(nextProps: any) {
    const {
      volunteers,
      volMap,
      VolActions,
      selectedMarker,
      currentLocation
    } = this.props;

    const { kakao } = window;
    var normalIconSrc = normalIcon, // 마커이미지의 주소입니다
      normalIconSize = new window.kakao.maps.Size(29, 46), // 마커이미지의 크기입니다
      normalIconOption = { offset: new window.kakao.maps.Point(14.5, 46) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    let markerImage = new kakao.maps.MarkerImage(
      normalIconSrc,
      normalIconSize,
      normalIconOption
    );
    if (selectedMarker !== null) selectedMarker.setImage(markerImage);

    if (volunteers.size === 0 && nextProps.volunteers.size > 0) {
      console.log("마커 렌더링을 한 번만 하기 위함");
      makeMarker(
        nextProps.volunteers.toJS(),
        volMap,
        VolActions,
        selectedMarker
      );
    }
    return (
      nextProps.volunteers.size > 0 &&
      currentLocation !== nextProps.currentLocation
    );
    // return true;
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
    const { volunteers, VolActions, selectedMarker } = this.props;
    const { volMap, currentLocation } = this.props;
    console.log("선택", selectedMarker);

    // makeMarker(volunteers.toJS(), volMap, VolActions, selectedMarker);
    const moveLatLon = new window.kakao.maps.LatLng(
      currentLocation.y,
      currentLocation.x
    );
    volMap.panTo(moveLatLon);
  }
  render() {
    console.log("render");
    return (
      <div>
        <div id="map" style={{ width: "100%", height: "50vh" }} />
      </div>
    );
  }
}

const getVols = (VolActions: any) => {
  try {
    VolActions.getVolList(); // 성공하면 store의 volunteers에 저장돼있음
  } catch (e) {
    console.log(e);
  }
};

const makeMarker = (
  volunteers: { v_id: string; v_x: number; v_y: number }[],
  volMap: any,
  VolActions: any,
  selectedMarker: any
) => {
  // console.log("Map.tsx의 makeMarker 봉사지역들 : ", volunteers);
  const { kakao } = window;
  var normalIconSrc = normalIcon, // 마커이미지의 주소입니다
    normalIconSize = new window.kakao.maps.Size(29, 46), // 마커이미지의 크기입니다
    normalIconOption = { offset: new window.kakao.maps.Point(14.5, 46) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
  var selectedIconSrc = selectedIcon,
    selectedIconSize = new window.kakao.maps.Size(29, 46),
    selectedIconOption = { offset: new window.kakao.maps.Point(14.5, 46) };
  let positions: List<{
    content: any;
    latlng: any;
  }> = List([]);
  volunteers.forEach((volunteer: any) => {
    positions = positions.push({ content: volunteer, latlng: null });
  });
  // var selectedMarker = null;
  // console.log("volunteers", volunteers);
  //console.log("전", positions.toJS());
  // if (positions.size >= 1)
  //   positions = positions.setIn(
  //     [0, "latlng"],
  //     new kakao.maps.LatLng(37.4730725331551, 126.703563159448)
  //   );
  // if (positions.size >= 2)
  //   positions = positions.setIn(
  //     [1, "latlng"],
  //     new kakao.maps.LatLng(37.4735032126755, 126.704281582484)
  //   );
  //console.log("후", positions.toJS());
  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  let markerImage = new kakao.maps.MarkerImage(
    normalIconSrc,
    normalIconSize,
    normalIconOption
  );
  let selectedMarkerImage = new kakao.maps.MarkerImage(
    selectedIconSrc,
    selectedIconSize,
    selectedIconOption
  );
  for (var i = 0; i < positions.size; i++) {
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      map: volMap, // 마커를 표시할 지도
      // position: positions.getIn([i, "latlng"]), // 마커의 위치
      position: new kakao.maps.LatLng(volunteers[i].v_y, volunteers[i].v_x), // 마커의 위치
      image: markerImage
    });
    // console.log("위치", marker);
    // let id = positions.getIn([i, "content", "v_id"]);
    let id = volunteers[i].v_id;
    window.kakao.maps.event.addListener(
      marker,
      "click",
      makeClickListener(
        volMap,
        marker,
        markerImage,
        selectedMarker,
        selectedMarkerImage,
        VolActions,
        id
      )
    );
  }
};

// 클릭 이벤트를 처리하는 클로저를 만드는 함수입니다
function makeClickListener(
  volMap: any,
  marker: any,
  markerImage: any,
  selectedMarker: any,
  selectedMarkerImage: any,
  VolActions: any,
  id: string
) {
  return function() {
    // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
    // 마커의 이미지를 클릭 이미지로 변경합니다
    console.log("여기 마커: ", selectedMarker);
    if (!selectedMarker || selectedMarker !== marker) {
      // 클릭된 마커 객체가 null이 아니면
      // 클릭된 마커의 이미지를 기본 이미지로 변경하고
      // console.log("이미선태됨", selectedMarker);
      !!selectedMarker && selectedMarker.setImage(markerImage);

      // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
      marker.setImage(selectedMarkerImage);
    }

    // // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
    // selectedMarker = marker;
    VolActions.setSelectedMarker(marker);
    VolActions.getVolById(id);
  };
}

export default connect(
  ({ vol }: any) => {
    return {
      volunteers: vol.get("volunteers"), // store에 있는 state를 this.pros로 연결
      currentLocation: vol.get("currentLocation"),
      volMap: vol.get("volMap"),
      selectedMarker: vol.get("selectedMarker")
    };
  },
  dispatch => ({
    VolActions: bindActionCreators(volActions, dispatch)
  })
)(Map);
