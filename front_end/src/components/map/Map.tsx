import React, { ReactElement, useEffect } from "react";
import iconSrc from "assets/images/location_marker.svg";
declare global {
  interface Window {
    kakao: any; // 이걸 선언하지 않으면 아래 코드에서 window.kakao를 찾지 못함.
  }
}
interface Props {}

export default function Map({}: Props): ReactElement {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    console.log(process.env);
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
      process.env.REACT_APP_KAKAO_MAP_KEY;
    document.head.appendChild(script);
    script.onload = () => {
      // onload() :  위의 카카오맵 스크립트를 documnet에 포함 한 후 콜백 함수 실행
      window.kakao.maps.load(function() {
        // maps.load() : 지도가 로딩된 이후에 콜백 함수 실행
        let container = document.getElementById("map");
        let options = {
          center: new window.kakao.maps.LatLng(
            34.9743340807081,
            128.32430017935
          ), // (y,x)
          level: 3
        };
        let map = new window.kakao.maps.Map(container, options);

        var imageSrc = iconSrc, // 마커이미지의 주소입니다
          imageSize = new window.kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
          imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          ),
          markerPosition = new window.kakao.maps.LatLng(
            34.9743340807081,
            128.32430017935
          ); // 마커가 표시될 위치입니다

        // 마커를 생성합니다
        var marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage // 마커이미지 설정
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
        // marker.setMap(null);
      });
    };
  }, []);
  return (
    <div>
      <div id="map" style={{ width: "100%", height: "60vh" }} />
    </div>
  );
}
