import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Label, Icon } from 'semantic-ui-react';

import storage from 'lib/storage';

const restBaseApi = process.env.REACT_APP_REST_BASE_API!;
let token = storage.get('token')

interface IProps {
    post_vote_members: Array<string>,
    p_id: number,
    vote_cnt: number,
}

class PostVote extends React.Component<IProps & any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            post_vote_members: this.props.post_vote_members,
            vote_cnt: this.props.post_vote_members.length
        }
    }
    handleVote(id:number) {
        var { m_id } = this.props.user.toJS()
        var post_vote = {
            p_id: id,
            m_id: m_id
        }
        axios.post( restBaseApi + "/rest/PostVote/",
        post_vote, 
        { headers: { Authorization: "Bearer " + token }})
        .then(res => {
            // console.log(res)
        })
        .catch(err => console.log(err))
        this.setState({vote_cnt: this.state.vote_cnt+1})
    }

    render() {
        const { m_id } = this.props.user.toJS()
        return (
            <Label
                as='a' 
                color={this.state.post_vote_members.includes(m_id) ? 'grey' : 'orange'} 
                size="large" 
                onClick={(id:any)=>this.handleVote(this.props.p_id)}
            >
                <Icon name="hand paper" />함께 해요 {this.state.vote_cnt}
            </Label>

        )
    }
}

export default connect(
    (state: any) => ({
        user: state.user.get("loggedInfo")
    }),

)(PostVote);