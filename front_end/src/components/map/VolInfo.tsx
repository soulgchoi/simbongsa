import React, { ReactElement } from 'react'
import "assets/mycss/location.scss";

//redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as volActions from "redux/modules/vol";

import { Link, match } from 'react-router-dom'
interface Props {
  // clickedVolId: number;
  selectedVolunteer: any;
}

export default function VolInfo({ selectedVolunteer }: Props): ReactElement {
  return (
    <div>
      {selectedVolunteer.v_id &&
        <div className="vol--info">
          <div>
            봉사활동명 : {selectedVolunteer.v_title}
          </div>
          <div>
            봉사일정: {selectedVolunteer.v_pBgnD} ~ {selectedVolunteer.v_pEndD} / {selectedVolunteer.v_bgnTm} ~ {selectedVolunteer.v_endTm}
          </div>
          <div>
            봉사장소: {selectedVolunteer.v_location}
          </div>
          <div>
            모집정보: {selectedVolunteer.v_mBgnD} ~ {selectedVolunteer.v_mEndD}
          </div>
          <Link to={{
            pathname: `vol/detail/${selectedVolunteer.v_id}`,
            state: selectedVolunteer.v_id
          }}>
            상세보기</Link>
        </div>}
    </div>
  )
}
