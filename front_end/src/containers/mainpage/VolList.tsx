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
<<<<<<< HEAD
    componentDidMount() {
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

=======
    componentDidMount(){
        const { VolActions } = this.props;
        VolActions.getInitailList(this.state.pageNum);
>>>>>>> ffd8aa3b0680cb7f996d48c1637c78205ef5479b
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