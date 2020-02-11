import React from 'react';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import AddComment from './AddComment';
import Vol from 'containers/mainpage/Vol'

interface Props {
    p_id: string;
    p_content: string,
    selectedFile?: File,
    volunteer: {
        v_id: number;
        v_title: string;
        v_pStatus: number;
        v_Auth: number;
    }
}

class Post extends React.Component<Props, {}>{
    render() {
        return (
            <div>
                <div>
                    {this.props.p_content}
                    <div>
                    created at
                    </div>
                </div>
                <div>
                    <Vol
                        volunteer={this.props.volunteer}
                    />
                </div>
                <div>
                    <p>text</p>
                    <Comments inP_id={this.props.p_id}/>
                    <AddComment inP_id={this.props.p_id}/>
                </div>
            </div>

        );
    }
};

export default Post;