import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import SearchContainer from 'containers/usersetting/SearchContainer'
import './ModalForm.css'
interface IState {
    open: boolean

}

class ModalExampleDimmer extends Component<any, IState> {
    state = { open: false }

    show = () => () => this.setState({ open: true })
    close = () => this.setState({ open: false })

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
                            onClick={this.close}
                        />
                    </Modal.Actions>
                </Modal>
            </div >
        )
    }
}

export default ModalExampleDimmer

