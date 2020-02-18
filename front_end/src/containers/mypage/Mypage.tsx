import React, { Component } from "react";

import { List } from "immutable";

// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PieGraph from "components/graph/PieGraph";
import * as volActions from "redux/modules/vol";
import RegionList from "lib/json/region.json";
import LinkButton from "components/button/LinkButton";
interface Props {
  VolActions: any;
  userId: string;
  volListByUserId: any[];
}
interface State {
  preferlocationDataList: any;
  preferlocationLabelList: any;
  preferTimeDataList: number[];
  preferTimeLabelList: string[];
}

class Mypage extends Component<Props, State> {
  state = {
    preferlocationDataList: List(),
    preferlocationLabelList: List(),
    preferTimeDataList: [],
    preferTimeLabelList: []
  };
  constructor(props: any) {
    super(props);
    console.log();
  }

  shouldComponentUpdate(nextProps: any) {
    // TODO : volListByUser에서 봉사지역, 봉사 시간등을 추출해서 통계 자료 data, labels 만들기...
    const { volListByUserId, userId } = this.props;
    let { preferlocationDataList, preferlocationLabelList } = this.state;
    // 봉사 리스트에 대해서 작업
    let list = volListByUserId;
    let preferLocationMap = new Map<string, number>();
    if (preferlocationDataList.size === 0 && typeof list !== "undefined") {
      list.forEach((item: any) => {
        // 지역 뽑아내기 (시, 구)
        let r_id = item.r_id - 1;
        let region1 = RegionList[r_id].r_sidoNm; // 시, 도
        let region2 = RegionList[r_id].r_gugunNm; // 구, 군

        // 선호 시간 뽑아내기 (시작 시간, 끝 시간)
        let beginTime = item.v_bgnTm; // 17:00:00 양식
        let endTime = item.v_endTm;
        // 같은 시 갯수 세기 ( 나중에 구 갯수도 추가 )
        if (typeof preferLocationMap.get(region1) === "undefined") {
          preferLocationMap.set(region1, 1);
        } else {
          preferLocationMap.set(region1, preferLocationMap.get(region1)! + 1);
        }
      });
      preferLocationMap.forEach((regionCount, regionName) => {
        preferlocationDataList = preferlocationDataList.push(regionCount);
        preferlocationLabelList = preferlocationLabelList.push(regionName);
      });
      // let preferTimeDataList = [],
      // let preferTimeLabelList = []
      if (preferlocationDataList.size > 0 && preferlocationLabelList.size > 0) {
        this.setState({ preferlocationDataList: preferlocationDataList });
        this.setState({ preferlocationLabelList: preferlocationLabelList });
      }
    }
    return this.state.preferlocationDataList.size > 0;
  }
  componentDidMount() {
    const { VolActions, userId } = this.props;
    VolActions.getVolListByUserId(userId);
  }

  render() {
    const { preferlocationDataList, preferlocationLabelList } = this.state;
    return (
      <div>
        <div>
          <LinkButton
            link="http://localhost:3000/usersetting"
            placeholder="내 정보 수정"
          />

          <PieGraph
            title={"봉사 선호 지역 통계"}
            data={preferlocationDataList.toJS()}
            labels={preferlocationLabelList.toJS()}
            width={300}
            height={300}
          />
          {/* <PieGraph
            data={[10, 20, 30, 40, 5, 5, 5, 5, 5, 5, 5, 5, 5]}
            labels={["red", "blue", "green"]}
            width={300}
            height={300}
          /> */}
        </div>
      </div>
    );
  }
}

export default connect(
  ({ user, vol }: any) => ({
    userId: user.getIn(["loggedInfo", "userId"]),
    volListByUserId: vol.get("volListByUserId")
  }),
  dispatch => ({
    VolActions: bindActionCreators(volActions, dispatch)
  })
)(Mypage);
