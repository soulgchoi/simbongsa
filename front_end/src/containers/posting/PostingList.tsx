import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from 'components/posting/Card'
import './PostingList.css'
import * as VolApi from 'lib/api/VolApi'

class PostingList extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      posts: [],
      pgNum: 1
    };
  }

  // v_id & 팔로우 여부로
  v_id = this.props.match.params.id;
  componentDidMount() {
    VolApi.getVolFeed(this.v_id, this.state.pgNum)
      .then((res: any) => {
        const data = res.data.data;

        this.setState({
          posts: data,
          pgNum: this.state.pgNum + 1
        });
      })
      .catch((err : any) => console.log(err));
  }
  loadMoreData() {
    VolApi.getVolFeed(this.v_id, this.state.pgNum)
      .then((res : any) => {
        const data = res.data.data;
        this.setState({
          posts: this.state.posts.concat(data),
          pgNum: this.state.pgNum + 1
        });
      })
      .catch((err : any) => console.log(err));
  }

  render() {
    const { posts } = this.state;
    const postingList = posts.map((post: any, i: any) => {
      return <Card color="white" post={post} key={i} />;
    });
    return (
      <InfiniteScroll
        dataLength={posts.length}
        next={this.loadMoreData.bind(this)}
        hasMore={posts.lehgth >= this.state.pgNum * 10}
        loader={<h4>게시글 목록을 불러오는 중</h4>}
        endMessage={<h4>모든 정보를 확인했습니다.</h4>}
      >
        {postingList}
      </InfiniteScroll>
    );
  }
}

export default PostingList;