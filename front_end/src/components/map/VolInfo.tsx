import React, { ReactElement } from "react";
import "assets/mycss/location.scss";

//redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as volActions from "redux/modules/vol";

interface Props {
  clickedVolId: number;
}

function VolInfo({ clickedVolId }: Props): ReactElement {
  return <div className="vol--info">상세정보에요 {clickedVolId}</div>;
}

export default connect(
  (state: any) => {
    return {
      volunteers: state.vol.get("clickedVolId") // store에 있는 state를 this.pros로 연결
    };
  },
  dispatch => ({
    VolActions: bindActionCreators(volActions, dispatch)
  })
)(VolInfo);
