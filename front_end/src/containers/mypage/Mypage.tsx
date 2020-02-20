import React, { Component } from "react";

import { List } from "immutable";

// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PieGraph from "components/graph/PieGraph";
import * as volActions from "redux/modules/vol";
import RegionList from "lib/json/region.json";
import CategoryList from "lib/json/category.json";

import LinkButton from "components/button/LinkButton";
interface Props {
  VolActions: any;
  userId: string;
  volListByUserId: List<any>;
}
interface State {
  preferlocationDataList: any;
  preferlocationLabelList: any;
  preferCategoryDataList: any;
  preferCategoryLabelList: any;
}

class Mypage extends Component<Props, State> {
  state = {
    preferlocationDataList: [] as any,
    preferlocationLabelList: [] as any,
    preferCategoryDataList: [] as any,
    preferCategoryLabelList: [] as any
  };
  action = async () => {
    const { userId, VolActions } = this.props
    console.log("mypage action 인풋", userId)
    await VolActions.getVolListByUserId(userId);
    // TODO : volListByUser에서 봉사지역, 봉사 시간등을 추출해서 통계 자료 data, labels 만들기...
    const { volListByUserId } = this.props;
    console.log("Mypage에서 action", volListByUserId.toJS())
    let preferlocationDataList = [] as any
    let preferlocationLabelList = [] as any
    let preferCategoryDataList = [] as any
    let preferCategoryLabelList = [] as any

    // 봉사 리스트에 대해서 작업
    let list = volListByUserId.toJS();
    let preferLocationMap = new Map<string, number>();
    let preferCategoryMap = new Map<string, number>();
    if (preferlocationDataList.length === 0 && typeof list !== "undefined") {
      list.forEach((item: any) => {
        console.log("아이템", item);
        // 지역 뽑아내기 (시, 구)
        let r_id = item.r_id - 1;
        let region1 = RegionList[r_id].r_sidoNm; // 시, 도
        let region2 = RegionList[r_id].r_gugunNm; // 구, 군
        console.log("region1", region1)
        // 선호 시간 뽑아내기 (시작 시간, 끝 시간)
        let beginTime = item.v_bgnTm; // 17:00:00 양식
        let endTime = item.v_endTm;
        // 같은 시 갯수 세기 ( 나중에 구 갯수도 추가 )
        if (typeof preferLocationMap.get(region1) === "undefined") {
          preferLocationMap.set(region1, 1);
          console.log("같은시 갯수 세기", preferLocationMap)
        } else {
          preferLocationMap.set(region1, preferLocationMap.get(region1)! + 1);
          console.log("같은시 갯수 세기", preferLocationMap)
        }

        // 카테고리 뽑아내기
        let ca_id = item.ca_id - 1;
        let bigCategory = CategoryList[ca_id].ca_highNm; // 생활편의지원
        let smallCategory = CategoryList[ca_id].ca_lowNm; // 청결 지도  <<<--- 이걸 쓴다.

        // 같은 카테고리 갯수 세기
        if (typeof preferCategoryMap.get(smallCategory) === "undefined") {
          preferCategoryMap.set(smallCategory, 1);
        } else {
          preferCategoryMap.set(
            smallCategory,
            preferCategoryMap.get(smallCategory)! + 1
          );
        }
      });
      console.log("LocationMap", preferLocationMap)
      preferLocationMap.forEach((regionCount, regionName) => {

        console.log("변경 전", preferlocationDataList, regionCount, regionName)
        preferlocationDataList.push(regionCount);
        console.log("변경 후", preferlocationDataList)
        preferlocationLabelList.push(regionName);
      });
      console.log("다 돌고나서 변경 후", preferlocationDataList)
      preferCategoryMap.forEach((categoryCount, categoryName) => {
        preferCategoryDataList.push(categoryCount);
        preferCategoryLabelList.push(categoryName);
      });
      // let preferTimeDataList = [],
      // let preferTimeLabelList = []
      console.log("함수가 처리되고", preferlocationDataList, preferlocationLabelList, preferCategoryDataList, preferCategoryLabelList)

      this.setState({ preferlocationDataList: preferlocationDataList, preferlocationLabelList: preferlocationLabelList, preferCategoryDataList: preferCategoryDataList, preferCategoryLabelList: preferCategoryLabelList });

    }
  }

  componentDidMount() {
    const { VolActions, userId } = this.props;
    console.log("마이페이지 userId", userId);

    this.action()

  }

  render() {
    const {
      preferlocationDataList,
      preferlocationLabelList,
      preferCategoryDataList,
      preferCategoryLabelList
    } = this.state;
    console.log("mypage에서 넘겨주는 정보", preferlocationDataList, preferlocationLabelList, preferCategoryDataList, preferCategoryLabelList)
    return (
      <div>
        <div>
          <PieGraph
            title={"봉사 선호 지역 통계"}
            data={preferlocationDataList}
            labels={preferlocationLabelList}
            width={250}
            height={250}
          />
          <PieGraph
            title={"선호 봉사 분야 통계"}
            data={preferCategoryDataList}
            labels={preferCategoryLabelList}
            width={250}
            height={250}
          />
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
