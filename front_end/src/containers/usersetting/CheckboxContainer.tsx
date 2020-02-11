import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActions from "redux/modules/search";
import { Checkbox } from 'semantic-ui-react'
interface Props {
    times: any
    SearchActions: any
}
interface State { }
class CheckboxContainer extends Component<Props, State> {
    state = {};

    handleToggle = (timeName: string) => {
        const { SearchActions } = this.props;
        console.log("timeName", timeName)
        SearchActions.toggle({ id: "times", value: timeName });
    };
    render() {
        console.log("렌더되니??")
        const { handleToggle } = this;
        const { times } = this.props;
        const { morning, afternoon } = times;
        console.log("times", times.toJS())
        return (
            <Fragment>
                <Checkbox
                    label='오전'
                    checked={morning}
                    onChange={() => handleToggle('morning')}
                />
                <Checkbox
                    label='오후'
                    checked={afternoon}
                    onClick={() => handleToggle('afternoon')}
                />
            </Fragment>
        );
    };
}



export default connect(
    ({ search }: any) => ({
        times: search.get('times'),
    }),
    dispatch => ({
        SearchActions: bindActionCreators(searchActions, dispatch)
    })
)(CheckboxContainer);
