import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import * as postingActions from "redux/modules/posting";
import { bindActionCreators } from "redux";
import GoBackButton from 'components/button/GoBackButton';
import { list } from 'react-immutable-proptypes';


class PostingForm extends React.Component<any, any> {

    componentWillMount() {
        const { PostingActions } = this.props;
        PostingActions.initializeForm("posting")
    }

    handleChange = (e: any) => {
        const { PostingActions } = this.props;
        var { id, value } = e.target;
        PostingActions.changeInput({
            id,
            value,
            form: "posting"
        });
        console.log(id)
    }

    handleFileChange = (e: any) => {
        const { PostingActions } = this.props;
        var id = e.target.id
        var value = e.target.files;
        console.log(value)
        // PostingActions.changeInput({
        //     id,
        //     value,
        //     form: "posting"
        // })
        // console.log(typeof value)
        // console.log(value)
        // var reader = new FileReader();
        // for ( let val of value ) {
        //     reader.readAsDataURL(val);
        //     // console.log(reader.readAsDataURL(val))
        //     PostingActions.changeInput({
        //         id,
        //         val,
        //         form: "posting"
        //     })
        // }
        console.log(this.props)
        // value.map( (val: File) => {
        //     reader.readAsDataURL(val);
        //     PostingActions.changeInput({
        //         id,
        //         value,
        //         form: "posting"
        //     })
        // })
    }

    handleSubmit = (e:any) => {
        e.preventDefault();
        console.log("submit")
        const { p_content, selectedFiles } = this.props.form
        console.log(this.props)
        // console.log(p_content)
        // console.log(selectedFiles)
    }

    // handleSubmit = (e: any) => {
    //     e.preventDefault();

    //     const fd = new FormData();
    //     fd.append("image", this.state.selectedFile);
    //     fd.set("data", this.state.p_content)
    //     if (this.props.volunteer.v_id) {
    //         fd.append("v_id", this.props.volunteer.v_id.toString())
    //     }

    //     axios.post("http://localhost:3002/post", fd)
    //     .then(res => {
    //         console.log(res)
    //         console.log(fd.get("image"))
    //         console.log(fd.get("data"))
    //         console.log(fd.get("v_id"))
    //     })
    //     this.setState({
    //         p_content: "",
    //         selectedFile: new File([""], "", {type: ""}),
    //         imagePreview: "",
    //         v_id: 0
    //     })
    // }

    render() {
        // let imagepreview = (
        //     <div></div>
        // );
        // if (this.state.imagePreview) {
        //     imagepreview = (
        //         <div>
        //             <img src={this.state.imagePreview} alt="uploaded image" width="200" />
        //         </div>
        //     )
        // }
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
                onChange={this.handleFileChange}
                value={selectedFiles}
            />
            <label htmlFor="selectedFiles" className="btn-1">이미지 업로드</label>
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