import React from 'react'
import axios from 'axios'
import storage from 'lib/storage'

let token = storage.get("token")

interface IProps {
    comment: {
        c_content: string,
        c_id: number,
        p_id: number
    },
    inP_id: number;
}

class Comment extends React.Component<IProps, {}>{
    
    deleteComment(c_id:number) {
        // axios.delete(`http://70.12.247.87:8080/rest/Comment/${c_id}`)
        // axios.delete(`http://70.12.247.126:8080/rest/Comment/${c_id}/`,
        axios.delete(`http://i02a205.p.ssafy.io:8080/A205/rest/Comment/${c_id}/`, 
        { headers: { Authorization: "Bearer " + token }})
    }


    render() {        
        return (
            <div>
                {this.props.comment.c_content}
                <button onClick={()=>this.deleteComment(this.props.comment.c_id)}>[X]</button>
            </div>
        )
    }
}

export default Comment;