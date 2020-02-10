import React from 'react';
import axios from 'axios';

interface Props {
    "p_id": string;
}

class AddComment extends React.Component<Props, {}> {
    state = {
        "c_content": "",
        inP_id: this.props.p_id
    }

    handleChange = (e:any) =>{
        console.log(this.state.c_content)
        this.setState({
            "c_content": e.target.value
        })
    }

    handleClick = () => {
        axios.post('http://localhost:3002/comment',{
            'c_content': this.state.c_content
        })
        .then(res => {
            this.setState({
                "c_content": "",

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