import React from 'react'
import axios from 'axios'
import CommentItem from './CommentItem'

interface IProps {
    inP_id: number;
}

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

    componentWillReceiveProps() {
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
                { comments }
            </div>
        )
    }
};

export default CommentList;