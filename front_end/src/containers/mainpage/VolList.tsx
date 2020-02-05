import React, { Component } from "react";
import axios from 'axios';
import Vol from './Vol';
import InfiniteScroll from 'react-infinite-scroll-component'

interface Props { }

class VolList extends Component<Props, {}> {
    state = {
        getDataArray: Array(),
        v_id: 0,
        v_title: "",
        pageNum: 1,
        url: "http://13.124.127.232:8080/A205/vol/titles/10/",
        v_pStatus: 0,
        v_Auth: 0,

    }
    componentWillMount() {
        console.log("state", this.state)
        axios.get(this.state.url + this.state.pageNum.toString())
            .then(response => {
                const data = response.data.data.map((d: any) => {
                    return { v_id: d.v_id, v_title: d.v_title, v_pStatus: d.v_pStatus, v_Auth: d.v_Auth }
                })
                this.setState({ getDataArray: data })
                this.setState({ pageNum: this.state.pageNum + 1 })
            })
            .catch(err =>
                console.log(err))

    }

    loadMoreData() {
        axios.get(this.state.url + this.state.pageNum.toString())
            .then(response => {
                const data = response.data.data.map((d: any) => {
                    return { v_id: d.v_id, v_title: d.v_title, v_pStatus: d.v_pStatus, v_Auth: d.v_Auth }
                })
                this.setState({ getDataArray: this.state.getDataArray.concat(data) })
                this.setState({ pageNum: this.state.pageNum + 1 })
                console.log('현재 들어오는 정보: ', this.state.getDataArray)
                console.log('페이지 넘버: ', this.state.pageNum)
            })
            .catch(err =>
                console.log(err))
    }


    render() {
        const volunteers = this.state.getDataArray.map((volunteer, i) => {
            return (
                <Vol volunteer={volunteer} key={i} />
            )
        })
        return (
            <InfiniteScroll
                dataLength={this.state.getDataArray.length}
                next={this.loadMoreData.bind(this)}
                hasMore={true}
                loader={<h4>봉사활동 목록을 불러오는중</h4>}
                endMessage={<h3>모든 정보를 확인했습니다.</h3>}
            >
                {volunteers}
            </InfiniteScroll>
        )
    }
}

export default VolList;