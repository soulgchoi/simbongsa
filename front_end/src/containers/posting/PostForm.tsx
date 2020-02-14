import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import * as postingActions from "redux/modules/posting";
import { bindActionCreators } from "redux";
import GoBackButton from 'components/button/GoBackButton';
import { list } from 'react-immutable-proptypes';
import Comments from "./Comments";
import { List } from 'immutable';



class PostingForm extends React.Component<any, any> {

    componentWillMount() {
        const { PostingActions } = this.props;
        PostingActions.initializeForm("posting")
    }

    handleChange = (e: any) => {
        const { PostingActions } = this.props;
        var { id, value } = e.target;
        console.log(value)
        PostingActions.changeInput({
            id,
            value,
            form: "posting"
        });
        console.log(this.props.form.toJS())
        // console.log(typeof this.props)
        console.log("---", this.props.form._root.entries[1])

    }

    handleFileSelect = (e: any) => {
        const { PostingActions } = this.props;
        var id = e.target.id
        var value = e.target.files;
        PostingActions.changeFileInput({
            id,
            value,
            form: "posting"
        })
        console.log(this.props.form)
    }

    handleSubmit = (e:any) => {
        e.preventDefault();
        const { selectedFiles, p_content, v_id, p_status } = this.props.form.toJS();
        const post = {
                p_content,
                v_id,
                p_status}
        // const files = new FormData();
        // for (let i=0; i<selectedFiles.length; i++) {
        //     files.append("files", selectedFiles[i])
        //     console.log(selectedFiles[i])
        //     console.log(files)

        // }
        const files = {
            selectedFiles
        }
        console.log(files)
        axios.post("http://i02a205.p.ssafy.io:8080/A205/rest/Post", {post, files}, 
        // axios.post("http://70.12.247.126:8080/rest/Post", {post, files},
        {headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'BearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxd2VydEBuYXZlci5jb20iLCJhdWQiOiIyNiIsImlzcyI6InF3ZXJ0IiwiZXhwIjoxNjEzMTc4MTQ4LCJpYXQiOjE1ODE2NDIxNDh9.qiTNnygKG972ykS6jRswyMIP6mfbnEFhCZraN-RUb3xJlSDbS46SNNQY3g9adOojGWS5XuFjdXXS7crybvkYVA',
         }})

        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
    }


    render() {
        const { selectedFiles, p_content } = this.props.form;
        return (
            
            <div className="wrapC">
                {/* // onSubmit={this.handleSubmit} */}
            <input
                value={p_content}
                className="posting"
                type="textarea"
                name="content"
                id="p_content"
                placeholder="내용을 입력하세요."
                onChange={this.handleChange} />
            <input
                type="file"
                id="selectedFiles"
                multiple
                onChange={this.handleFileSelect}
                value={selectedFiles}
            />
            <label htmlFor="selectedFiles">이미지 업로드</label>
                {/* {imagepreview} */}
            <button className="my--btn" onClick={this.handleSubmit}>게시글 등록하기</button>
             <GoBackButton
                    text="취소하기"
                />
             </div>
        );
    }
  }

export default connect(
    (state: any) => ({
        form: state.posting.getIn(["posting", "form"]),
        result: state.posting.get("result")
    }),
    dispatch => ({
        PostingActions: bindActionCreators(postingActions, dispatch)
    })
)(PostingForm);