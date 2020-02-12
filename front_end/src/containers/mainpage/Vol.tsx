import React, { Component } from 'react';
import CertLabel from 'components/label/CertLabel'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import * as volActions from "redux/modules/volunteer";
import { bindActionCreators } from "redux";

interface Props {
    "v_id": number;
}

class Vol extends React.Component<Props & any, any> {

    handleClick(id: string) {
        const { VolActions } = this.props;
        VolActions.selectVol(id)
    }

    render() {
        const { volunteers } = this.props;
        const myVol = volunteers.find( (x:any) => x.v_id === this.props.v_id);
        return (
        <div className="list">
            <CertLabel
                volunteer={myVol}
            />
            <div className="linktodetail">
                <Link
                    to={{pathname: `vol/detail/${myVol.v_id}`}}
                    onClick={() => this.handleClick(myVol.v_id)}
                >
                    상세보기</Link>
            </div>
            <div className="listtitle">
                {myVol.v_title}
            </div>
        </div>
        )
    }
}

export default connect(
    (state: any) => ({
        volunteers: state.volunteer.get("volunteers"),
        volunteer: state.volunteer.get("volunteer")
    }),
    dispatch => ({
        VolActions: bindActionCreators(volActions, dispatch)
    })
)(Vol);