import React, { Component } from "react";
import axios from 'axios'


interface Props {
    
}

interface State {
}

export default class VolList extends Component<Props, State> {
    state = {
        volunteers: Array()
    }
    componentDidMount(){
        axios.get('http://localhost:3001/volunteer')
        .then(response => {
            console.log(response.data)
            this.setState({volunteers: JSON.parse(response.data)})
            console.log(this.state.volunteers)
        })
        .catch(function(error) {
            console.log(error);
        })
    }
    render() {

        return (
            <div>
                {this.state.volunteers}
            </div>
        );
    }
}