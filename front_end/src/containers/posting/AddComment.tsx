import React from 'react';
import axios from 'axios';

interface Props {
    "inP_id": string;
}

class AddComment extends React.Component<Props, {}> {
    state = {
        "c_content": "",
        "inP_id": ""
    }

    handleChange = (e:any) =>{
        console.log(this.state.c_content)
        this.setState({
            "c_content": e.target.value
        })
    }

    handleClick = () => {
        axios.post(`http://i02a205.p.ssafy.io:8080/A205/rest/Post/${this.props.inP_id}/Comment`,
        {
            'c_content': this.state.c_content,
            'p_id': this.props.inP_id
        })
        .then(res => {
            this.setState({
                "c_content": "",
                "p_id": "",
            })
        })
    }

    render() {
        return(
            <div>
                <div>
                    <img src="#" alt=""/>
                </div>
                <form>
                    <input type="text"
                        value={this.state.c_content}
                        onChange={this.handleChange}
                    ></input>
                    <button onClick={this.handleClick}>comment</button>
                </form>
            </div>
        )
    }
};

export default AddComment;