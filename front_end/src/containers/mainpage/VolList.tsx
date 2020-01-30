import React, { Component } from "react";
import axios from 'axios';
import Vol from './Vol';
import InfiniteScroll from 'react-infinite-scroll-component'

interface Props {}

interface State {
    temp: Array<any>;
    pageNum: number;
}

class VolList extends Component<Props, State> {
    state = {
        temp: Array(),
        pageNum: 1
    }
    componentWillMount(){
        axios.get('http://localhost:3001/' + this.state.pageNum.toString())
        .then(response => {
            this.setState({temp: response.data.volunteers})
            console.log(this.state.temp)
            this.setState({pageNum: this.state.pageNum + 1})
            console.log(this.state.pageNum)
        })
        .catch(err =>
            console.log(err))
    }

    loadMoreData() {
        axios.get('http://localhost:3001/' + this.state.pageNum.toString())
        .then(response => {
            this.setState({temp: this.state.temp.concat(response.data.volunteers)})
            console.log(this.state.temp)
            this.setState({pageNum: this.state.pageNum + 1})})
        .catch(err =>
            console.log(err))
    }


    render() {
        const volunteers = this.state.temp.map( (volunteer, i) => {
            return (
                <div className="list">
                    <Vol volunteer={volunteer} key={i}/>
                </div>
            )
        })

        return (
            <InfiniteScroll
                    dataLength={this.state.temp.length}
                    next={this.loadMoreData.bind(this)}
                    hasMore={true}
                    loader={<h4>loading</h4>}
                    
                >
                    {volunteers}    
            </InfiniteScroll>
        );
    }
}

export default VolList;