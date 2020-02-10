import React from 'react';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import AddComment from './AddComment';

interface Props {
    p_id: string;
    p_content: string,
    selectedFile?: File,
    v_id?: null

}

class Post extends React.Component<Props, {}>{
    render() {
        return (
            <div>
                <div>
                    {this.props.p_content}
                    {/* <img src="#" alt="포스트에 딸린 이미지"/>     */}
                    <div>
                    created at
                    </div>
                </div>
                <div>
                    <p>text</p>
                    <Comments inP_id={this.props.p_id}/>
                    <AddComment p_id={this.props.p_id}/>
                </div>
            </div>

        );
    }
};

export default Post;