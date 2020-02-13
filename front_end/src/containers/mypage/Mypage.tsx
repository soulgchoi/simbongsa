import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
interface Props {}
interface State {}

export default class Mypage extends Component<Props, State> {
  state = {
    data: {
      labels: ["Red", "Yellow", "Blue"],
      datasets: [
        {
          label: "# of Votes",
          data: [10, 20, 30],
          backgroundColor: [
            `rgba(255, 99, 132, 0.4)`,
            `rgba(54, 162, 235, 0.4)`,
            `rgba(255, 206, 86, 0.4)`
          ],
          borderWidth: 3
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  };
  componentDidMount() {
    //   this.setState({data : {datasets[0] : backgroundColor}})
  }

  getRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  generateBackgroundColor = (dataSize: number): string[] => {
    let list: string[] = [];
    for (let i = 0; i < dataSize; i++) {
      list.push(this.getRandomColor());
    }
    return list;
  };

  render() {
    const data = (canvas: any) => {
      const ctx = canvas.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 0, 100, 0);
      return {
        backgroundColor: gradient
      };
    };
    return (
      <div>
        마이페이지 입니다.
        <div>
          <div>
            <Doughnut
              data={this.state.data}
              width={500}
              height={500}
              options={{ maintainAspectRatio: false }} // width, height 커스텀 사이즈로 하기 위해선 옵션에서 maintainAspectRatio: false 설정
            />
          </div>
        </div>
      </div>
    );
  }
}
