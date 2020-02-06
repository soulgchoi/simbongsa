import React, { Component } from "react";
import iconSrc from "assets/images/location_marker.png";
import { List, Map } from "immutable";
// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import * as volActions from "redux/modules/vol";

declare global {
  interface Window {
    kakao: any; // 이걸 선언하지 않으면 아래 코드에서 window.kakao를 찾지 못함.
  }
}
interface Props {
  initLocation: any;
  volunteers: any;
  VolActions: any;
}

interface State {
  googleMapsPromise: any;
}

export default class VolMap extends Component<Props, State> {
  constructor(props: Props) {
    console.log("constuctor");
    super(props);
    this.getData();
    // this.state = {
    //   // kakao: null,
    //   // map: null
    // };
    // 카카오 맵을 로딩하는 과정 시작

    //console.log("맵 로딩 끝");
  }

  getData() {
    const { volunteers } = this.props;
    const { VolActions } = this.props;
    const initLocation = this.props.initLocation;
    // new Promise() 추가
    return new Promise(function(resolve) {
      const script = document.createElement("script");
      script.async = true;
      script.id = "kakaoMap"; // script의 id를 kakaoMap으로 지정해줌 --->>> <script id="kakaoMap" ...
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
        process.env.REACT_APP_KAKAO_MAP_KEY;
      document.head.appendChild(script);
      console.log("script", script);
      // 카카오 맵을 로딩하는 과정 끝

      // script.onload = () => {
      //   // this.setState({ kakao: window.kakao });
      //   console.log("script", script);
      //   window.kakao.maps.load(() => {
      //     console.log("onload");
      //     let container = document.getElementById("map");
      //     console.log("맵에서 initLocation", initLocation);
      //     // options : 지도의 현재 위치, 확대 크기
      //     let options = {
      //       center: new window.kakao.maps.LatLng(
      //         initLocation.y,
      //         initLocation.x
      //         // 37.4730725331551,
      //         // 126.703563159448
      //       ), // (y,x)
      //       level: 3
      //     };

      //     let map = new window.kakao.maps.Map(container, options); // 맵을 만듦
      //     // this.setState({ map: map });
      //     window.kakao.maps.event.addListener(map, "click", () => {
      //       VolActions.resetSelectedVol();
      //     });
      //     //  makeClickListener(map, marker, VolActions, id));
      //     makeMarker(volunteers, map, VolActions); // (봉사정보 객체 리스트, 마커를 표시할 맵) 을 인풋으로 주면 맵에 마커가 표시됩니다.
      //     //makeMarker(volunteer의 y좌표(36 정도로 시작), voluteer의 x좌표(126 정도로 시작), map); // (y, x, 마커를 표시할 맵) 을 인풋으로 주면 맵에 마커가 표시됩니다.
      //   });
      // };
      // resolve();
    });
  }

  // // getData()의 실행이 끝나면 호출되는 then()
  // getData().then(function (tableData) {
  //   // resolve()의 결과 값이 여기로 전달됨
  //   console.log(tableData); // $.get()의 reponse 값이 tableData에 전달됨
  // });

  shouldComponentUpdate(nextProps: Props) {
    console.log("현재위치", this.props.initLocation);
    console.log("다음위치", nextProps.initLocation);
    console.log(
      "현재 위치 !==다음위치 ",
      this.props.initLocation !== nextProps.initLocation
    );

    console.log("현재봉사", this.props.volunteers);
    console.log("다음봉사", nextProps.volunteers);
    console.log(
      "현재 봉사 !== 다음봉사",
      this.props.volunteers !== nextProps.volunteers
    );
    return (
      this.props.volunteers !== nextProps.volunteers ||
      this.props.initLocation !== nextProps.initLocation
    );
  }
  // componentDidMount 가 아니라
  // componentDidUpdate 에 하는 이유 --> props 변경이 생겼을 때 이를 반영한 새로운 맵을 그려줘야 함 -> let map = new window.kakao.map 부분
  componentDidUpdate() {
    console.log("componentDidUpdate");
    // const initLocation = this.props.initLocation;
    // var moveLatLon = new window.kakao.maps.LatLng(
    //   initLocation.y,
    //   initLocation.x
    // );
    // console.log(window.kakao.maps);
    // // 지도 중심을 이동 시킵니다
    // this.setState({ map: this.state.map.setCenter(moveLatLon) });
    const { volunteers } = this.props;
    const { VolActions } = this.props;
    const initLocation = this.props.initLocation;
    let script = document.getElementsByTagName("script").namedItem("kakaoMap"); // script중 id가 kakaoMap인것을 찾아옴
    if (script) {
      console.log("스크립트");
      script.onload = () => {
        console.log("script", script);
        window.kakao.maps.load(function() {
          let container = document.getElementById("map");
          console.log("맵에서 initLocation", initLocation);
          // options : 지도의 현재 위치, 확대 크기
          let options = {
            center: new window.kakao.maps.LatLng(
              initLocation.y,
              initLocation.x
              // 37.4730725331551,
              // 126.703563159448
            ), // (y,x)
            level: 3
          };

          let map = new window.kakao.maps.Map(container, options); // 맵을 만듦
          // //console.log("자원봉사: ", volunteers);
          // //console.log("시작위치: ", init_location.y, init_location.x);
          window.kakao.maps.event.addListener(map, "click", () => {
            VolActions.resetSelectedVol();
          });
          //  makeClickListener(map, marker, VolActions, id));
          makeMarker(volunteers, map, VolActions); // (봉사정보 객체 리스트, 마커를 표시할 맵) 을 인풋으로 주면 맵에 마커가 표시됩니다.
          //makeMarker(volunteer의 y좌표(36 정도로 시작), voluteer의 x좌표(126 정도로 시작), map); // (y, x, 마커를 표시할 맵) 을 인풋으로 주면 맵에 마커가 표시됩니다.
        });
      };
    }
  }

  componentWillUnmount() {
    const script = document
      .getElementsByTagName("script")
      .namedItem("kakaoMap"); // script중 id가 kakaoMap인것을 찾아옴
    if (script !== null)
      document
        .getElementsByTagName("head")
        .item(0)
        ?.removeChild(script);
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

const makeMarker = (volunteers: [], map: any, VolActions: any) => {
  //console.log("Map.tsx의 makeMarker 봉사지역들 : ", volunteers);
  const { kakao } = window;
  var imageSrc = iconSrc, // 마커이미지의 주소입니다
    imageSize = new window.kakao.maps.Size(29, 46), // 마커이미지의 크기입니다
    imageOption = { offset: new window.kakao.maps.Point(14.5, 46) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
  let positions: List<{
    content: any;
    latlng: any;
  }> = List([]);
  volunteers.forEach((volunteer: any) => {
    positions = positions.push({ content: volunteer, latlng: null });
  });
  //console.log("volunteers", volunteers);
  //console.log("전", positions.toJS());
  if (positions.size >= 1)
    positions = positions.setIn(
      [0, "latlng"],
      new kakao.maps.LatLng(37.4730725331551, 126.703563159448)
    );
  if (positions.size >= 2)
    positions = positions.setIn(
      [1, "latlng"],
      new kakao.maps.LatLng(37.4735032126755, 126.704281582484)
    );
  //console.log("후", positions.toJS());
  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  let markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );
  for (var i = 0; i < positions.size; i++) {
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: positions.getIn([i, "latlng"]), // 마커의 위치
      image: markerImage
    });

    // // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
    // var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    //   iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // // 인포윈도우를 생성합니다
    // var infowindow = new kakao.maps.InfoWindow({
    //   content: iwContent,
    //   removable: iwRemoveable
    // });

    // 마커에 클릭이벤트를 등록합니다
    // //console.log("window.kakao.maps", window.kakao.maps.event.addListener);
    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    let id = positions.getIn([i, "content", "v_id"]);
    window.kakao.maps.event.addListener(
      marker,
      "click",
      makeClickListener(map, marker, VolActions, id)
    );
  }
};

// 클릭 이벤트를 처리하는 클로저를 만드는 함수입니다
function makeClickListener(map: any, marker: any, VolActions: any, id: string) {
  return function() {
    VolActions.getVolById(id);
  };
}
