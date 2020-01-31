import React, { Component } from "react";
import axios from 'axios';
import Vol from './Vol';
import InfiniteScroll from 'react-infinite-scroll-component'

interface Props {}

interface State {
    getDataArray: Array<any>;
    pageNum: number;
    url: string;
}

class VolList extends Component<Props, State> {
    state = {
        getDataArray: Array(),
        pageNum: 1,
        url: "http://70.12.247.126:8080/rest/Titles/10/"
    }
    componentWillMount(){
        axios.get(this.state.url + this.state.pageNum.toString())
        .then(response => {
            this.setState({getDataArray: response.data.data})
            this.setState({pageNum: this.state.pageNum + 1})
        })
        .catch(err =>
            console.log(err))
    }

    loadMoreData() {
        axios.get(this.state.url + this.state.pageNum.toString())
        .then(response => {
            this.setState({getDataArray: this.state.getDataArray.concat(response.data.data)})
            console.log('현재 들어오는 정보: ', this.state.getDataArray)
            console.log('페이지 넘버: ', this.state.pageNum)
            this.setState({pageNum: this.state.pageNum + 1})})
        .catch(err =>
            console.log(err))
    }


    render() {
        return (
            <InfiniteScroll
                    dataLength={this.state.getDataArray.length}
                    next={this.loadMoreData.bind(this)}
                    hasMore={true}
                    loader={<h4>봉사활동 목록을 불러오는중</h4>}
                    endMessage={<h3>모든 정보를 확인했습니다.</h3>}
                >
                <Vol volunteers={this.state.getDataArray} />
            </InfiniteScroll>
        );
    }
}

export default VolList;