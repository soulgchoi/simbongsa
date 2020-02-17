import _ from 'lodash'
import React, { Component, Fragment } from 'react'
import { Search, Grid, Header, Segment, Placeholder } from 'semantic-ui-react'
import SearchPresenter from 'components/search/SearchPresenter';
// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import * as userActions from "redux/modules/user";
import * as baseActions from "redux/modules/base";
import * as volActions from "redux/modules/vol";
import * as searchActions from "redux/modules/search";
import storage from "lib/storage";
import ActionButton from 'components/button/ActionButton'
class SearchBar extends React.Component<any, any> {
    state = {
        loading: false,
        error: ""
    }
    handleSubmit = (event: any) => {
        const { input, SearchActions } = this.props
        event.preventDefault()
        if (input !== "") {
            this.searchByTerm();
            SearchActions.searchSubmit(true);
        }
    }

    updateTerm = (event: any) => {
        const { SearchActions } = this.props
        const { target: { value } } = event
        console.log(value)
        SearchActions.changeInput({ input: value, key: "" })
    }
    searchByTerm = async () => {
        const { input, VolActions } = this.props
        this.setState({ loading: true })
        try {
            VolActions.getVolList(input)

        } catch{
            this.setState({ error: "Can't find result." })

        } finally {
            this.setState({ loading: false })
        }

    }

    render() {
        const { volunteers, input } = this.props
        console.log("vol", volunteers)
        const { loading, error } = this.state
        return (
            <Fragment>
                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment><SearchPresenter
                                volResults={volunteers}
                                input={input}
                                loading={loading}
                                error={error}
                                handleSubmit={this.handleSubmit}
                                updateTerm={this.updateTerm}
                            ></SearchPresenter></Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment><ActionButton action={this.handleSubmit} placeholder="검색" /></Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Fragment>

        )
    }
}


export default connect(
    ({ vol, search }: any) => {
        return {
            volunteers: vol.get("volunteers"), // store에 있는 state를 this.pros로 연결
            input: search.get("input"),
        };
    },
    dispatch => ({
        VolActions: bindActionCreators(volActions, dispatch),
        SearchActions: bindActionCreators(searchActions, dispatch)
    })
)(SearchBar);
