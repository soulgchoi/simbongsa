// import _ from 'lodash'
import React, { Fragment } from 'react'
import SearchPresenter from 'components/search/SearchPresenter';
// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "redux/modules/user";
import * as volActions from "redux/modules/vol";
import * as searchActions from "redux/modules/search";
interface Iprops {
    input: string
    SearchActions: any
    VolActions: any
    loading: boolean
    UserActions: any
    volunteers: any
    locations: any
    categorys: any
    times: any
}
interface Istate {
    error: string
}
class SearchBar extends React.Component<Iprops, Istate> {
    state = {
        error: "",
    }
    handleSubmit = (event: any) => {
        const {  SearchActions } = this.props
        event.preventDefault()

        this.searchByTerm();
        SearchActions.searchSubmit(true);

    }

    updateTerm = (event: any) => {
        const { SearchActions } = this.props
        const { target: { value } } = event
        console.log(value)
        SearchActions.changeInput({ input: value, key: "" })
    }
    searchByTerm = async () => {
        const { input, VolActions, locations, categorys, times, UserActions, SearchActions } = this.props
        let preferLocate = locations.toJS().map((location: any) => location.text)
        console.log(preferLocate)
        let preferCategory = categorys.toJS().map((category: any) => category.text)
        const locateSize = preferLocate.length
        const categorySize = preferCategory.length
        console.log(locateSize)
        for (let i = 0; i < 3 - locateSize; i++) {
            preferLocate.push("null null")
            console.log("for문")
        }
        for (let i = 0; i < 3 - categorySize; i++) {
            preferCategory.push(null)
        }
        console.log("preferLocate", preferLocate)
        console.log("preferCategory", preferCategory)
        const firstLocation = preferLocate[0].split(" ")
        const secondLocation = preferLocate[1].split(" ")
        const thirdLocation = preferLocate[2].split(" ")

        const firstCategory = preferCategory[0]
        console.log(firstCategory)
        const secondCategory = preferCategory[1]
        const thirdCategory = preferCategory[2]

        let bgnTm = "";
        let endTm = "";

        if (times.toJS().morning === true) {
            bgnTm = "00:00:00";
        } else if (times.toJS().morning === false) {
            bgnTm = "12:00:01";
        }
        if (times.toJS().afternoon === true) {
            endTm = "23:59:59";
        } else if (times.toJS().afternoon === false) {
            endTm = "12:00:00";
        }
        if (times.toJS().afternoon === false && times.toJS().morning === false) {
            bgnTm = "00:00:01";
            endTm = "23:59:58";
        }
        console.log("hihihihihihihih", preferLocate)
        UserActions.changeLoading(true)
        try {
            VolActions.getVolList({ input: input, firstLocation: firstLocation, secondLocation: secondLocation, thirdLocation: thirdLocation, firstCategory: firstCategory, secondCategory: secondCategory, thirdCategory: thirdCategory, bgnTm: bgnTm, endTm: endTm })
            VolActions.getInitailList({ input: input, firstLocation: firstLocation, secondLocation: secondLocation, thirdLocation: thirdLocation, firstCategory: firstCategory, secondCategory: secondCategory, thirdCategory: thirdCategory, bgnTm: bgnTm, endTm: endTm, pageNum: 1 })
        } catch{
            this.setState({ error: "Can't find result." })
        } finally {
            UserActions.changeLoading(false)
            SearchActions.lastInput(input)
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
            loading: user.get('loading'),
            locations: search.get("locations"),
            categorys: search.get("categorys"),
            times: search.get("times"),
        };
    },
    dispatch => ({
        VolActions: bindActionCreators(volActions, dispatch),
        SearchActions: bindActionCreators(searchActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch),
    })
)(SearchBar);
