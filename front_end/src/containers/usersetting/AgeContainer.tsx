import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActions from "redux/modules/search";
import { Checkbox } from 'semantic-ui-react'
import { localLogin } from '../../lib/api/UserApi';
interface Props {
    ages: any
    SearchActions: any


}
interface State { }
class AgeContainer extends Component<Props, State> {
    state = {};

    handleToggle = (first: string, second: string) => {
        const { SearchActions } = this.props;

        console.log("ageName", first, second)
        SearchActions.toggle({ id: "ages", value: first, othervalue: second });
    };
    render() {
        console.log("렌더되니??")
        const { handleToggle } = this;
        const { ages } = this.props;
        const { youth, adult } = ages.toJS();
        console.log("youth, adult", youth, adult)
        console.log("ages", ages.toJS())
        return (
            <Fragment>
                <Checkbox
                    label='청소년'
                    checked={youth}
                    onChange={() => handleToggle('youth', 'adult')}
                />
                <Checkbox
                    label='성인'
                    checked={adult}
                    onClick={() => handleToggle('adult', 'youth')}
                />
            </Fragment>
        );
    };
}
export default connect(
    ({ search }: any) => ({
        ages: search.get('ages'),

    }),
    dispatch => ({
        SearchActions: bindActionCreators(searchActions, dispatch)
    })
)(AgeContainer);
