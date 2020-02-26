import React, { Component } from "react";

import { List } from "immutable";

// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PieGraph from "components/graph/PieGraph";
import * as volActions from "redux/modules/vol";
import RegionList from "lib/json/region.json";
import CategoryList from "lib/json/category.json";

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

class Statistics extends Component<Props, State> {
  state = {
    preferlocationDataList: List(),
    preferlocationLabelList: List(),
    preferCategoryDataList: List(),
    preferCategoryLabelList: List()
  };

  shouldComponentUpdate(nextProps: any) {
    return true;
  }
  componentDidMount() {
    // TODO : volListByUser에서 봉사지역, 봉사 시간등을 추출해서 통계 자료 data, labels 만들기...
    const { volListByUserId } = this.props;
    let {
      preferlocationDataList,
      preferlocationLabelList,
      preferCategoryDataList,
      preferCategoryLabelList
    } = this.state;
    // 봉사 리스트에 대해서 작업
    let list = volListByUserId.toJS();
    let preferLocationMap = new Map<string, number>();
    let preferCategoryMap = new Map<string, number>();
    if (preferlocationDataList.size === 0 && typeof list !== "undefined") {
      list.forEach((item: any) => {
        // 지역 뽑아내기 (시, 구)
        let r_id = item.r_id - 1;
        let region1 = RegionList[r_id].r_sidoNm; // 시, 도
        // let region2 = RegionList[r_id].r_gugunNm; // 구, 군

        // 선호 시간 뽑아내기 (시작 시간, 끝 시간)
        // let beginTime = item.v_bgnTm; // 17:00:00 양식
        // let endTime = item.v_endTm;
        // 같은 시 갯수 세기 ( 나중에 구 갯수도 추가 )
        if (typeof preferLocationMap.get(region1) === "undefined") {
          preferLocationMap.set(region1, 1);
        } else {
          preferLocationMap.set(region1, preferLocationMap.get(region1)! + 1);
        }

        // 카테고리 뽑아내기
        let ca_id = item.ca_id - 1;
        // let bigCategory = CategoryList[ca_id].ca_highNm; // 생활편의지원
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
      preferLocationMap.forEach((regionCount, regionName) => {
        preferlocationDataList = preferlocationDataList.push(regionCount);
        preferlocationLabelList = preferlocationLabelList.push(regionName);
      });
      preferCategoryMap.forEach((categoryCount, categoryName) => {
        preferCategoryDataList = preferCategoryDataList.push(categoryCount);
        preferCategoryLabelList = preferCategoryLabelList.push(categoryName);
      });
      // let preferTimeDataList = [],
      // let preferTimeLabelList = []
      if (preferlocationDataList.size > 0 && preferlocationLabelList.size > 0) {
        this.setState({ preferlocationDataList: preferlocationDataList });
        this.setState({ preferlocationLabelList: preferlocationLabelList });
      }
      if (preferCategoryDataList.size > 0 && preferCategoryLabelList.size > 0) {
        this.setState({ preferCategoryDataList: preferCategoryDataList });
        this.setState({ preferCategoryLabelList: preferCategoryLabelList });
      }
    }
  }

  render() {
    const {
      preferlocationDataList,
      preferlocationLabelList,
      preferCategoryDataList,
      preferCategoryLabelList
    } = this.state;
    return (
      <div>
        <div>
          <PieGraph
            title={"봉사 선호 지역 통계"}
            data={preferlocationDataList.toJS()}
            labels={preferlocationLabelList.toJS()}
            width={250}
            height={250}
          />
          <PieGraph
            title={"선호 봉사 분야 통계"}
            data={preferCategoryDataList.toJS()}
            labels={preferCategoryLabelList.toJS()}
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
    volListByUserId: vol.get("volListByUserId")
  }),
  dispatch => ({
    VolActions: bindActionCreators(volActions, dispatch)
  })
)(Statistics);
