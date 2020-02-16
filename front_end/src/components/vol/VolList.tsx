import React, { Component } from "react";
import axios from 'axios';
import { List } from 'immutable';
import Vol from 'components/vol/Vol';
import InfiniteScroll from 'react-infinite-scroll-component'

interface Props {
    volunteers: any[];
    width?: number;
    height: string;
    appendList: () => void; // volunteers 에 10개를 더 붙여주는 함수.
}
interface State {

}

export default class VolList extends React.Component<Props, State> {
    state = {
        pageNum: 1
    }
    loadMoreData = () => {
        this.setState({ pageNum: this.state.pageNum + 1 })
        this.props.appendList();
    }
    render() {
        const { volunteers, height } = this.props;
        const { loadMoreData } = this;
        const PrintArray = volunteers.map((vol: any, i: any) => {
            return (
                <Vol volunteer={vol} v_id={vol.v_id} key={i} />
            )
        })

        console.log("높이", height);
        return (
            <InfiniteScroll
                dataLength={this.state.pageNum * 10}
                height={height}
                next={loadMoreData}
                hasMore={true}
                loader={<h4>봉사활동 목록을 불러오는중</h4>}
                endMessage={<h3>모든 정보를 확인했습니다.</h3>}
            >
                {PrintArray}
            </InfiniteScroll>
        )
    }
}