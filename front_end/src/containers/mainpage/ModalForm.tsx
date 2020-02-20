import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import SearchContainer from 'containers/usersetting/SearchContainer'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import * as userActions from "redux/modules/user";
import * as baseActions from "redux/modules/base";
import * as volActions from "redux/modules/vol";
import * as searchActions from "redux/modules/search";
import './ModalForm.css'
interface IState {
    open: boolean

}

class ModalExampleDimmer extends Component<any, IState> {
    state = { open: false }

    show = () => () => this.setState({ open: true })
    close = () => this.setState({ open: false })
    handleSubmit = (event: any) => {
        this.close()
        this.searchByTerm();
    }
    searchByTerm = async () => {
        const { input, VolActions, locations, categorys, times, UserActions } = this.props
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
            console.log("error")
        } finally {
            UserActions.changeLoading(false)
        }

    }
    render() {
        const { open } = this.state

        return (
            <div>
                <Button id="filter-button" color="orange" onClick={this.show()}>필터</Button>
                <Modal emmer={'blurring'} open={open} onClose={this.close} size='fullscreen' centered={false}>
                    <Modal.Header>필터 설정</Modal.Header>
                    <Modal.Content scrolling>
                        <Modal.Description>
                            <SearchContainer></SearchContainer>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content="저장하기"
                            onClick={this.handleSubmit}
                        />
                    </Modal.Actions>
                </Modal>
            </div >
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
)(ModalExampleDimmer);

