import React from 'react'
import axios from 'axios'

import 'assets/mycss/posting.scss'
import 'assets/mycss/components.scss'
import 'assets/mycss/fileinput.scss'

import 'assets/css/style.scss'


interface IProps {
    onSaveData: Function;
}

class PostingForm extends React.Component<IProps, {}> {
    state = {
        content: "",
        selectedFile: new File([""], "", {type: ""}),
        imagePreview: ""
    }

    handleChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFileChange = (e: any) => {
        this.setState({
            selectedFile: e.target.files[0]
        })

        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                imagePreview: reader.result as string
            })
        }

        reader.readAsDataURL(e.target.files[0])
    }

    handleSubmit = (e: any) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append("image", this.state.selectedFile);
        fd.set("data", this.state.content)
        axios.post("http://localhost:3002/post", fd)
        .then(res => {
            console.log(res)
            console.log(fd.get("image"))
            console.log(fd.get("data"))
        })

    }

    render() {
        let $imagePreview = (
            <div></div>
        );
        if (this.state.imagePreview) {
            $imagePreview = (
                <div>
                    <img src={this.state.imagePreview} alt="uploaded image" width="200" />
                </div>
            )
        }

        return (
            <div className="wrapC">
            <form
                onSubmit={this.handleSubmit}
                className="posting-form">
                <input
                    className="posting"
                    type="textarea"
                    name="content"
                    placeholder="내용을 입력하세요."
                    onChange={this.handleChange} />
                <input
                    type="file"
                    id="file"
                    onChange={this.handleFileChange}
                />
                <label htmlFor="file" className="btn-1">이미지 업로드</label>
                {$imagePreview}
                <button className="my--btn" type="submit" onClick={this.handleSubmit}>게시글 등록하기</button>
                
             </form>
             </div>
        );
    }
};


export default PostingForm;