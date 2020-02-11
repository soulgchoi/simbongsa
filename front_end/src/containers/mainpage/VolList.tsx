import React, { Component } from "react";
import axios from 'axios';
import Vol from './Vol';
import InfiniteScroll from 'react-infinite-scroll-component'
import { connect } from "react-redux";
import * as volActions from "redux/modules/volunteer";
import { bindActionCreators } from "redux";

class VolList extends React.Component<any, any> {
    state = {
        pageNum: 1,
    }
    componentDidMount(){
        const { VolActions } = this.props;
        VolActions.getInitailList(this.state.pageNum);
    }

    loadMoreData(){
        this.setState({ pageNum: this.state.pageNum + 1 })
        const { VolActions } = this.props;
        VolActions.appendList(this.state.pageNum);
    }
    
    render() {
        const { volunteers } = this.props;
        console.log(volunteers)
        const PrintArray = volunteers.map(( vol:any, i:any ) => {
            return (
                <Vol v_id={vol.v_id} key={i} />
            )
        })

        return (
            <InfiniteScroll
                dataLength={this.state.pageNum * 10}
                next={this.loadMoreData.bind(this)}
                hasMore={true}
                loader={<h4>봉사활동 목록을 불러오는중</h4>}
                endMessage={<h3>모든 정보를 확인했습니다.</h3>}
            >
                {PrintArray}
            </InfiniteScroll>
        )
    }
}
        
export default connect(
    (state: any) => ({
        volunteers: state.volunteer.get("volunteers"),
    }),
    dispatch => ({
        VolActions: bindActionCreators(volActions, dispatch)
    })
)(VolList);