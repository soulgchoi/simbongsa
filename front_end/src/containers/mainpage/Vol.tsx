import React, { Component } from 'react';
import CertLabel from '../../components/label/CertLabel'

interface Props {
    volunteer: {
        id: number;
        status: number;
        many: number;
        bgnTm: number;
        endTm: number;
        location: string;
        adult: number;
        young: number;
        mBgnD: number;
        mEndD: number;
        pBgnD: number;
        pEndD: number;
        title: string;
        url: string;
    }
}

interface State {
    isCert: string;
    isCertClass: string;
    isFull: string;
    isFullClass: string;
}


export default class Vol extends Component<Props, State> {
    state = {
        isCert: "",
        isCertClass: "",
        isFull: "",
        isFullClass: ""
    }

    componentWillMount() {
        if (this.props.volunteer.status === 1) {
            this.setState({isCert: "인증"})
            this.setState({isCertClass: "tag iscert"})
        }
        if (this.props.volunteer.many === 1) {
            this.setState({isFull: "모집완료"})
            this.setState({isFullClass: "tag full"})
        } else if (this.props.volunteer.many === 0) {
            this.setState({isFull: "모집중"})
            this.setState({isFullClass: "tag n-full"})
        }
    }

    render() {
        return (
            <div>
                <CertLabel
                    isCert={this.state.isCert}
                    isCertClass={this.state.isCertClass}
                    isFull={this.state.isFull}
                    isFullClass={this.state.isFullClass}
                /><br/>
                이름: {this.props.volunteer.title}<br/>
                staus: {this.props.volunteer.status} <br /><br/>
            </div>
        )
    }
}