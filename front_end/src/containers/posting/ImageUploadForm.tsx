import React from 'react';
import axios from 'axios'

interface IProps {}


interface IState {
    selectedFile: File;
    imagePreview: string;
}

class ImageUploadForm extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props)
        this.state = {
            selectedFile: new File([""], "", {type: ""}),
            imagePreview: ""
        }
    }

    fileSelectHandler = (e: any) => {
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

    fileUploadHandler = (e: any) => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        axios.post('http://localhost:3001/post', fd, {
            // 몇 퍼센트 업로드 됐는지 출력하는 부분
            onUploadProgress: progressEvent => { 
                console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
            }
        }
        )
        .then( res =>
            console.log(res));

    }

    render () {
        let $imagePreview = (
            <div className="previewText">이미지 프리뷰</div>
        );
        if (this.state.imagePreview) {
            $imagePreview = (
                <div>
                    <img src={this.state.imagePreview} alt="uploaded image" width="200" />
                </div>
            )
        }

        return (
            <div className="">
                <input
                    type="file"
                    onChange={this.fileSelectHandler}
                />
                <button onClick={this.fileUploadHandler}>이미지 업로드</button>
                {$imagePreview}
            </div>
        )
    }
}

export default ImageUploadForm;