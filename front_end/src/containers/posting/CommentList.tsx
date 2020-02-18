import React from 'react';
import axios from 'axios';
import Comment from './Comment';
import storage from 'lib/storage'

let token = storage.get("token");

interface Props {
  inP_id: number;
}

interface States {
  comments: Array<any>;
}

class CommentList extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      comments: []
    };

    console.log(this.props.inP_id);
    axios
      .get(
        `${process.env.REACT_APP_REST_BASE_API}/rest/Comment/${this.props.inP_id}/`,
        { headers: { Authorization: "Bearer " + token } }
      )

      .then(res => {
        console.log(res);
        if (res.data.length > 0) {
          const data = res.data.map((d: any) => {
            // if (data.p_id === this.props.inP_id) {
            return { c_id: d.c_id, p_id: d.p_id, c_content: d.c_content };
            // }
          });
          this.setState({
            comments: data
          });
        }
      });
  }

  render() {
    const prints = this.state.comments.map((comment, i) => {
      return <CommentItem comment={comment} inP_id={comment.p_id} key={i} />;
    });

    return (
      <div>
        {prints}
        {/* <span onClick={()=>this.deleteComment()}></span> */}
      </div>
    );
  }
}

        console.log(this.props.inP_id)
        axios.get(`http://i02a205.p.ssafy.io:8080/A205/rest/Comment/${this.props.inP_id}/`,
        { headers: { Authorization: "Bearer " + token }})

        .then( res => {
            console.log(res)
            if (res.data.data.length > 0) {
                console.log(res.data)
                const data = res.data.data.map( (d: any) => {
                        return {c_id: d.c_id, p_id: d.p_id, c_content: d.c_content, m_id: d.m_id}
                })
                this.setState({
                    comments: data
                })
            }
        })

    }

    render() {
        console.log(this.state.comments)
        const prints = this.state.comments.map( (comment, i) => {
                return (
                    <Comment
                        comment={comment}
                        inP_id={comment.p_id}
                        key={i}
                    />
                )
        })

        return (
            <div>
                {prints}
                {/* <span onClick={()=>this.deleteComment()}></span> */}
            </div>
    )}
};

export default CommentList;