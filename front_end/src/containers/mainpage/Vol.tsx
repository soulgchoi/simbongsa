import React, { Component } from 'react';
import CertLabel from 'components/label/CertLabel'
import { Link } from 'react-router-dom'
// import VolLinkButton from 'components/button/LinkButton'

interface Props {
    volunteer: {
        "v_id": number;
        "v_title": string;
        "v_pStatus": number;
        "v_Auth": number;
    }
}
export default class Vol extends Component<Props, {}> {
    render() {
        return (<div className="list">
            <CertLabel
                volunteer={this.props.volunteer}
            />
            <div className="linktodetail">
                <Link to={{
                    pathname: `vol/detail/${this.props.volunteer.v_id}`,
                }}>
                    상세보기</Link>
            </div>
            <div className="listtitle">
                {this.props.volunteer.v_title}
            </div>
            </div>
        )

    }
}