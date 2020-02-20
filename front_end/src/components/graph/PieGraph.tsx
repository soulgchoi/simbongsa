import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { Map, List } from "immutable";
// @ts-ignore
var palette = require("google-palette");
var convert = require("color-convert");
interface Props {
  labels: any[];
  data: any[];
  width: any;
  height: any;
  title: string;
}
interface State { }

export default class PieGraph extends Component<Props, State> {
  state = {
    data: {
      labels: [] as any,
      datasets: [
        {
          label: "",
          data: [] as any,
          backgroundColor: [] as any,
          borderWidth: 3
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      responsive: false
    }
  };


  // action() {
  //   console.log("action에서 Props", this.props)
  //   const propsData = this.props.data;

  //   const { generateBackgroundColor } = this;
  //   const { data } = this.state;
  //   const { labels } = this.props;
  //   const len = propsData.length;
  //   console.log("넘겨받은 정보", propsData)
  //   this.setState({
  //     data: {
  //       ...data,
  //       labels: labels,
  //       datasets: [
  //         {
  //           ...data.datasets,
  //           data: propsData,
  //           backgroundColor: generateBackgroundColor(len)
  //         }
  //       ]
  //     }
  //   });
  // }
  // componentDidMount() {
  //   console.log("didMount")
  //   this.action()
  // }
  shouldComponentUpdate(nextProps: any) {
    const propsData = this.props.data;
    console.log("should Update?", propsData);
    if (this.state.data.datasets[0].data.length === 0) {
      const { generateBackgroundColor } = this;
      const { data } = this.state;
      const { labels } = this.props;
      const len = propsData.length;
      this.setState({
        data: {
          ...data,
          labels: labels,
          datasets: [
            {
              ...data.datasets,
              data: propsData,
              backgroundColor: generateBackgroundColor(len)
            }
          ]
        }
      });
    }
    console.log("should", this.state.data)
    return this.state.data.datasets[0].data.length > 0;
  }




  generateBackgroundColor = (numberOfItems: number): string[] => {
    // 아래 두 가지 라이브러리 사용, 첫 번째 : 무지개 색 만들기, 두 번째 : rgb->hsv 변환 후 s값을 반으로 줄여서 연하게 만들기
    // https://www.npmjs.com/package/google-palette
    // https://www.npmjs.com/package/color-convert
    let list = palette(["rainbow"], numberOfItems);
    list = list.map(
      (item: string) =>
        "#" + convert.hsv.hex([convert.hex.hsv(item)[0], 50, 100])
    );
    console.log("색깔", list)
    return list;
  };

  render() {
    const { data, options } = this.state;
    const { width, height, title } = this.props;
    console.log("그래프에 필요한 것들...", data, width, height, options)
    return (
      <div>
        <div> {title} </div>
        {data.datasets[0].data.length === 0 && (
          <div>봉사 기록이 없어요. 이제 시작 해볼까요?</div>
        )}
        {data.datasets[0].data.length > 0 && (
          <Pie
            data={data}
            width={width}
            height={height}
            options={options} // width, height 커스텀 사이즈로 하기 위해선 옵션에서 maintainAspectRatio: false 설정
          />
        )}
      </div>
    );
  }
}

