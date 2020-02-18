import React from 'react'
import axios from 'axios'
import storage from 'lib/storage'
import { Icon, Button } from 'semantic-ui-react'
import { connect } from "react-redux";

let token = storage.get("token")

interface IProps {
    comment: {
        c_content: string,
        c_id: number,
        p_id: number,
        m_id: number,
    },
    inP_id: number;
}

class Comment extends React.Component<IProps & any, {}>{
    
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
        return (
            <div>
                {this.props.comment.c_content}
                {m_id == this.props.comment.m_id &&
                <Icon name="delete" onClick={()=> { if (window.confirm("댓글을 삭제하시겠습니까?")) this.deleteComment(this.props.comment.c_id)}} />
                }
            </div>
        )
    }
}

export default connect(
    (state: any) => ({
        user: state.user.get("loggedInfo")
    }),

)(Comment);