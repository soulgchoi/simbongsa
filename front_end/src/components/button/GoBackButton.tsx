import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

interface IProps extends RouteComponentProps {
    text: string;
}

class GoBackButton extends React.Component<IProps, {}> {


    render() {
        return (
            <button
                onClick={this.props.history.goBack}
            >
                {this.props.text}
            </button>
        );
    }
};


export default withRouter(GoBackButton);