import React from 'react'
import axios from 'axios'

// 코멘트 작성 부분
// p_id, m_id



class CommentForm extends React.Component {
    state = {
        comment: "",
    }

    handleChange = (e:any) => {
        this.setState({
            comment: e.target.value
        })
    }

    handleSubmit = (e: any) => {
        e.preventDefault();

        axios.post('http://localhost:3002/comment', {
            'c_content': this.state.comment
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
        
        
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="">유저이름을 넣을 것</label>
                        <input 
                            onChange={this.handleChange}
                            type="text" 
                            placeholder="댓글창"
                            value={this.state.comment}
                        />
                    </div>
                    <button type="submit">작성하기</button>
                </form>
            </div>
        )
    }
};

export default CommentForm;