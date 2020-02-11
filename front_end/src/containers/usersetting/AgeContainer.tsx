import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActions from "redux/modules/search";
import { Checkbox } from 'semantic-ui-react'
interface Props {
    ages: any
    SearchActions: any
}
interface State { }
class AgeContainer extends Component<Props, State> {
    state = {};

    handleToggle = (ageName: string) => {
        const { SearchActions } = this.props;
        console.log("ageName", ageName)
        SearchActions.toggle({ id: "ages", value: ageName });
    };
    render() {
        console.log("렌더되니??")
        const { handleToggle } = this;
        const { ages } = this.props;
        const { youth, adult } = ages;
        console.log("times", ages.toJS())
        return (
            <Fragment>
                <Checkbox
                    label='청소년'
                    checked={youth}
                    onChange={() => handleToggle('youth')}
                />
                <Checkbox
                    label='성인'
                    checked={adult}
                    onClick={() => handleToggle('adult')}
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
