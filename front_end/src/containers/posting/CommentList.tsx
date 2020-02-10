import React from 'react'
import axios from 'axios'
import CommentItem from './CommentItem'
import CommentForm from './CommentForm'
interface IProps {
    inP_id: number;
}

// commentlist
// commentform
// commentitem
// getcommentlist
// 작성하기에 post 랑 get 요청을 다 넣어야하나?
// handlesubmit 랑 get 하는 함수를 props 로...

class CommentList extends React.Component<IProps, {}> {
    state = {
        getComments: Array(),
        c_id: 0,
        p_id: 0,
        c_content: ""
    }

    componentDidMount() {
        axios.get('http://localhost:3002/comment')
        .then( res => {
            console.log(res)
            if (res.data.length > 0) {
                const data = res.data.map( (d: any) => { 
                        return {c_id: d.id, p_id: d.p_id, c_content: d.c_content}
                })
                console.log(data)
                console.log(this.props.inP_id)
                // if (data.p_id === this.props.inP_id) {
                this.setState({
                    getComments: data
                })
                // }
            }
        })
        .catch( err => console.log(err))
    }

    handleUpdate() {
        axios.get('http://localhost:3002/comment')
        .then( res => {
            console.log(res)
            if (res.data.length > 0) {
                const data = res.data.map( (d: any) => { 
                        return {c_id: d.id, p_id: d.p_id, c_content: d.c_content}
                })
                console.log(data)
                console.log(this.props.inP_id)
                // if (data.p_id === this.props.inP_id) {
                this.setState({
                    getComments: data
                })
                // }
            }
        })
        .catch( err => console.log(err))
    }
    render() {
        const comments = this.state.getComments.map( (comment, i) => {
            return (
                <CommentItem comment={comment} key={i} />
            )
        })
        return (
            <div>
                <CommentForm />
                { comments }
            </div>
        )
    }
};

export default CommentList;