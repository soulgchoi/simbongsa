import React from 'react';
import CertLabel from 'components/label/CertLabel'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import * as volActions from "redux/modules/vol";
import { bindActionCreators } from "redux";
import './Vol.css'
interface Props {
    v_id: number;
    volunteer: any;
}

class Vol extends React.Component<Props & any, any> {
    render() {
        const { volunteer } = this.props;
        console.log('voluuuuuuuuuu', volunteer)
        // console.log("이거면 된다", volunteer.v_Auth, volunteer.v_pStatus)
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