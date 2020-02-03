import React, { Component } from 'react';
import CertLabel from '../../components/label/CertLabel'
import VolDetail from './VolDetail'
import { Link, match } from 'react-router-dom'

interface Props {
    // volunteer: string;
    volunteers: Array<string>;
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

    // componentWillMount() {
    //     if (this.props.data.status === 0) {
    //         this.setState({isCert: "인증"})
    //         this.setState({isCertClass: "tag iscert"})
    //     }
    //     if (this.props.volunteer.many === 1) {
    //         this.setState({isFull: "모집완료"})
    //         this.setState({isFullClass: "tag full"})
    //     } else if (this.props.volunteer.many === 0) {
    //         this.setState({isFull: "모집중"})
    //         this.setState({isFullClass: "tag n-full"})
    //     }
    // }

    render() {
        const volunteer = this.props.volunteers.map( volTitle => {

            return <div className="list">
                <CertLabel
                    isCert="인증"
                    isCertClass="tag iscert"
                    isFull="모집중"
                    isFullClass="tag n-full"
                />
                <div className="linktodetail">
                <Link to={`mainpage/detail/${volTitle}`}>상세보기</Link>
                </div>
                <div className="listtitle">
                
                {volTitle}
                </div>
                </div>
        })
        
        return (
            <div>
                {volunteer}
            </div>
        )
    }
}