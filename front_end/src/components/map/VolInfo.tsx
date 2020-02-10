import React, { ReactElement } from "react";
import "assets/mycss";
import iconSrc from "assets/images/location_marker.svg";

//직접 만든 컴포넌트
import LinkButton from "components/button/LinkButton";

//redux 관련
import { connect } from "react-redux";

interface Props {
  selectedVolunteer: any;
}

function VolInfo({ selectedVolunteer }: Props): ReactElement {
  console.log("render");
  console.log(selectedVolunteer);
  return (
    <div className="main--text">
      {!selectedVolunteer.v_id && (
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
      )}
      {selectedVolunteer.v_id && (
        <div className="vol--info">
          <div>봉사활동명 : {selectedVolunteer.v_title}</div>
          <div>
            봉사일정: {selectedVolunteer.v_pBgnD} ~ {selectedVolunteer.v_pEndD}{" "}
            / {selectedVolunteer.v_bgnTm} ~ {selectedVolunteer.v_endTm}
          </div>
          <div>봉사장소: {selectedVolunteer.v_location}</div>
          <div>
            모집정보: {selectedVolunteer.v_mBgnD} ~ {selectedVolunteer.v_mEndD}
          </div>
          <LinkButton
            link={`vol/detail/${selectedVolunteer.v_id}`}
            placeholder="상세보기"
          />
        </div>
      )}
    </div>
  );
}

export default connect(({ vol }: any) => {
  return {
    selectedVolunteer: vol.get("selectedVolunteer")
  };
})(VolInfo);
