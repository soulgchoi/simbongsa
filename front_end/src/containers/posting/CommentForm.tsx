import React from 'react';
import axios from 'axios';
import storage from "lib/storage";

import { connect } from "react-redux";

import './CommentForm.css'

import { Input, Button } from 'semantic-ui-react'

const restBaseApi = process.env.REACT_APP_REST_BASE_API!;
let token = storage.get("token")


interface Props {
    "inP_id": number;
}

class CommentForm extends React.Component<Props & any, {}> {
    state = {
        "c_content": "",
        "inP_id": "",
        "m_id": this.props.user.toJS().m_id,
    }

    handleChange = (e:any) =>{
        this.setState({
            "c_content": e.target.value
        })
    }

    handleClick = () => {
        axios.post(restBaseApi + '/rest/Comment',
        {
            'c_content': this.state.c_content,
            'p_id': this.props.inP_id.toString(),
            'm_id': this.props.user.toJS().m_id
        },
        { headers: { Authorization: "Bearer " + token }}
        )
        .then(res => {
            this.setState({
                "c_content": ""
            })
        })
        .catch(err => console.log(err))
        window.location.reload(true);
        }

    render() {

        return(
            <div>
                <Input
                    size='small'
                    value={this.state.c_content}
                    onChange={this.handleChange}
                    label={<Button
                        onClick={this.handleClick}
                        >등록</Button>
                    }
                    labelPosition="right"
                />
            </div>
        )
    }
};

export default connect(
    (state: any) => ({
        user: state.user.get("loggedInfo")
    }),

)(CommentForm);