import React, { Component } from "react";
import update from 'react-addons-update'
import axios from 'axios';
import Vol from './Vol';

interface Props {}

interface State {
    temp: Array<any>;
}

class VolList extends Component<Props, State> {
    state = {
        // volunteers: Array(),
        temp: Array()
    }
    componentWillMount(){
        axios.get('http://localhost:3001/volunteer')
        .then(response => {
            this.setState({temp: response.data.volunteers})
            console.log(this.state.temp)})
            
        .catch(err =>
            console.log(err))
    }
    render() {
        const volunteers = this.state.temp.map( (volunteer, i) => {
            return (
                <div>
                    <Vol volunteer={volunteer} key={i}/>
                </div>
            )
        })
        return (
            <div>
                {volunteers}
            </div>
        );
    }
}

export default VolList;