import React from 'react'
import axios from 'axios'
import storage from 'lib/storage'
import { Icon } from 'semantic-ui-react'

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
    
    deleteComment(e: any, c_id:number) {
        e.preventdefault();
        axios.delete(`http://i02a205.p.ssafy.io:8080/A205/rest/Comment/${c_id}/`, 
        { headers: { Authorization: "Bearer " + token }})
    }


    render() {        
        return (
            <div>
                {this.props.comment.c_content}
                <button onClick={(e)=> { if (window.confirm("댓글을 삭제하시겠습니까?")) this.deleteComment(e, this.props.comment.c_id)}}>
                    <Icon delete />
                </button>
            </div>
        )
    }
}

export default Comment;