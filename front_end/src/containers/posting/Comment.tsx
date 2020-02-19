import React from 'react'
import axios from 'axios'
import storage from 'lib/storage'
import { Icon, Button, Confirm } from 'semantic-ui-react'
import { connect } from "react-redux";
import './Comment.css'

let token = storage.get("token");

interface IProps {
    comment: {
        c_content: string,
        c_id: number,
        p_id: number,
        m_id: number,
        userId: string,
    },
    inP_id: number;
}

class Comment extends React.Component<IProps & any, {}>{
    state = {
        open: false,
        result: false
    }

    show = () => this.setState({ open: true })
    
    handleConfirm = () => this.setState({ result: true, open: false })
    
    handleCancle=() => this.setState({ result: false, open: false })

    deleteComment(c_id:number) {
        // axios.delete("http://70.12.247.87:8080/rest/Comment/" + c_id,
        axios.delete(`http://i02a205.p.ssafy.io:8080/A205/rest/Comment/${c_id}`, 
        { headers: { Authorization: "Bearer " + token }})
        .then( res => {
            console.log(res)
        })
        .catch( err => console.log(err))
        window.location.reload(true);
    }


    render() {   
        var { m_id } = this.props.user.toJS()     
        if (this.state.result === true) {
            this.deleteComment(this.props.comment.c_id)
            this.setState({ result: false})
        }
 
        return (
            <div>
                <span className="name">{this.props.comment.userId}</span>
                < br/>
                <span className="content">{this.props.comment.c_content}</span>
                {m_id == this.props.comment.m_id &&
                <Icon style={{ float: 'right'}} name="delete" onClick={this.show} />
                }
                <Confirm
                    open={this.state.open}
                    onCancel={this.handleCancle}
                    onConfirm={this.handleConfirm}
                />
            </div>
        )
    }
}

export default connect(
    (state: any) => ({
        user: state.user.get("loggedInfo")
    }),

)(Comment);