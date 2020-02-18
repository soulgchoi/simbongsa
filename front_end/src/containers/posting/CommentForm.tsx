import React from 'react';
import axios from 'axios';
import storage from "lib/storage";
import { useHistory } from 'react-router-dom';
import GoBackButton from 'components/button/GoBackButton'
import { connect } from "react-redux";


import { Input, Form, Button } from 'semantic-ui-react'

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

    handleChange = (e: any) => {
        console.log(this.state.c_content)
        this.setState({
            "c_content": e.target.value
        })
        console.log(this.props.inP_id)
    }

    handleClick = () => {
        axios.post(`http://i02a205.p.ssafy.io:8080/A205/rest/Comment`,
            // axios.post(`http://70.12.247.87:8080/rest/Comment/`,
            // axios.post(`http://70.12.247.126:8080/rest/Comment/`,
            {
                'c_content': this.state.c_content,
                'p_id': this.props.inP_id.toString(),
                'm_id': this.props.user.toJS().m_id
            },
            { headers: { Authorization: "Bearer " + token } }
        )
            .then(res => {
                this.setState({
                    "c_content": ""
                })
                console.log(res)
            })
            .catch(err => console.log(err))
        window.location.reload(true);
        // this.handleBack()
    }

    // handleBack() {
    //     this.props.history.push('/');
    // }


    render() {

        return (
            <div>
                <Form>
                    <div>
                        <Input
                            size='small'
                            value={this.state.c_content}
                            onChange={this.handleChange}
                        ></Input>
                        <Button
                            onClick={this.handleClick}>
                            댓글 등록
                    </Button>
                    </div>
                </Form>
            </div>
        )
    }
};

export default connect(
    (state: any) => ({
        user: state.user.get("loggedInfo")
    }),

)(CommentForm);