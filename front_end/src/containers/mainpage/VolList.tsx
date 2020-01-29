import React, { Component } from "react";
import axios from 'axios';
import Vol from './Vol';

interface Props {}

interface State {
    volunteers: Array<object>
}

class VolList extends Component<Props, State> {
    state = {
        volunteers: []
    }
    componentWillMount(){
        axios.get('http://localhost:3001/volunteer')
        .then(response => {
            console.log(response.data)
            this.setState({volunteers: response.data})
            console.log(this.state.volunteers)
        })
        .catch(function(error) {
            console.log(error);
        })
    }
    render() {
        const volunteers = this.state.volunteers.map( (volunteer, i) => {
            return (
                <div>
                    <Vol volunteer={volunteer} key={i}/>
                </div>
            )
        })
        return (
            <div>
                {this.state.volunteers}
            </div>
        );
    }
}

export default VolList;