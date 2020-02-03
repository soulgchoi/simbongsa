import React from 'react'
import axios from 'axios'


interface IProps {
    onSaveData: Function;
}

class PostingForm extends React.Component<IProps, {}> {
    state = {
        content: "",
        // date: "",
    }

    handleChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e: any) => {
        e.preventDefault();

        axios.post("http://localhost:3001/post", {
            "p_content": this.state.content
        })
        .then(res => {
            console.log(res)
        })

    }

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="posting-form">
                <input
                    type="textarea"
                    name="content"
                    placeholder="내용을 입력하세요."
                    onChange={this.handleChange} />
                <button type="submit">게시글 등록하기</button>
             </form>

        );
    }
};


export default PostingForm;