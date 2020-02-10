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
        let {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }
    handleClick = () => {
        axios.post('url')
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
                    <input type="textarea"
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