import React from 'react';
import axios from 'axios';

import GoBackButton from 'components/button/GoBackButton';

interface IProps {
    volunteer: {
        "v_id": number;
        "v_title": string;
        "v_pStatus": number;
        "v_Auth": number;
    }
}

class PostingForm extends React.Component<IProps, {}> {
    state = {
        p_content: "",
        selectedFile: new File([""], "", {type: ""}),
        imagePreview: "",
    }

    handleChange = (e: any) => {
        this.setState({
            p_content: e.target.value
        })
    }

    handleFileChange = (e: any) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        if (file && file.type.match('image.*')) {
            reader.readAsDataURL(file);
            this.setState({selectedFile: file})
        }
        reader.onloadend = () => {
            this.setState({imagePreview: reader.result as string })
        }
    }

    handleSubmit = (e: any) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append("image", this.state.selectedFile);
        fd.set("data", this.state.p_content)
        if (this.props.volunteer.v_id) {
            fd.append("v_id", this.props.volunteer.v_id.toString())
        }

        axios.post("http://localhost:3002/post", fd)
        .then(res => {
            console.log(res)
            console.log(fd.get("image"))
            console.log(fd.get("data"))
            console.log(fd.get("v_id"))
        })
        this.setState({
            p_content: "",
            selectedFile: new File([""], "", {type: ""}),
            imagePreview: "",
            v_id: 0
        })
    }

    render() {
        let imagepreview = (
            <div></div>
        );
        if (this.state.imagePreview) {
            imagepreview = (
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
                    value={this.state.p_content}
                    className="posting"
                    type="textarea"
                    name="content"
                    placeholder="내용을 입력하세요."
                    onChange={this.handleChange} />
                <input
                    type="file"
                    id="file"
                    multiple
                    onChange={this.handleFileChange}
                />
                <label htmlFor="file" className="btn-1">이미지 업로드</label>
                    {imagepreview}
                <button className="my--btn" onClick={this.handleSubmit}>게시글 등록하기</button>
                <GoBackButton
                    text="취소하기"
                />
             </form>
             </div>
        );
    }
};


export default PostingForm;