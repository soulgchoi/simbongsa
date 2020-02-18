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
interface Iprops {
    input: string
    SearchActions: typeof searchActions
    VolActions: typeof volActions
    loading: boolean
    UserActions: typeof userActions
    volunteers: any
}
interface Istate {
    error: string
}
class SearchBar extends React.Component<Iprops, Istate> {
    state = {
        error: "",
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
        const { input, VolActions, loading, UserActions } = this.props
        UserActions.changeLoading(true)
        try {
            await VolActions.getVolList(input)
        } catch{
            this.setState({ error: "Can't find result." })
        } finally {
            UserActions.changeLoading(false)
        }

    }



    render() {
        const { volunteers, input } = this.props
        console.log("vol", volunteers)
        const { error } = this.state
        return (
            <Fragment>
                <SearchPresenter
                    volResults={volunteers}
                    input={input}
                    error={error}
                    handleSubmit={this.handleSubmit}
                    updateTerm={this.updateTerm}
                ></SearchPresenter>
            </Fragment >

        )
    }
}


export default connect(
    ({ vol, search, user }: any) => {
        return {
            volunteers: vol.get("volunteers"), // store에 있는 state를 this.pros로 연결
            input: search.get("input"),
            loading: user.get('loading')
        };
    },
    dispatch => ({
        VolActions: bindActionCreators(volActions, dispatch),
        SearchActions: bindActionCreators(searchActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch),
    })
)(SearchBar);
