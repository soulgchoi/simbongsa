import React, { Component } from 'react';
import CertLabel from 'components/label/CertLabel'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import * as volActions from "redux/modules/vol";
import { bindActionCreators } from "redux";

interface Props {
    "v_id": number;
    volunteer: any;
}

class Vol extends React.Component<Props & any, any> {
    render() {
        const { volunteer } = this.props;
        return (
            <div className="list">
                <CertLabel
                    v_Auth={volunteer.v_Auth}
                    v_pStatus={volunteer.v_pStatus}
                />
                <div className="linktodetail">
                    <Link
                        to={{
                            pathname: `vol/${volunteer.v_id}/detail`,
                            state: { volunteer }
                        }}
                    >
                        상세보기</Link>
                </div>
                <div className="listtitle">
                    {volunteer.v_title}
                </div>
            </div>
        )
    }
}

export default connect(
    () => ({
    }),
    dispatch => ({
        VolActions: bindActionCreators(volActions, dispatch)
    })
)(Vol);