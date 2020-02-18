import React, { Component, Fragment } from "react";
import Tab from "containers/mainpage/Tab"
import SearchBar from "components/search/SearchBar"
import SearchContainer from 'containers/usersetting/SearchContainer';
import ModalForm from './ModalForm'
import { Grid, Segment, Responsive, Container, Header, Icon, Image, Dimmer, Loader, GridColumn } from 'semantic-ui-react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import * as userActions from "redux/modules/user";
import * as baseActions from "redux/modules/base";
import * as volActions from "redux/modules/vol";
import * as searchActions from "redux/modules/search";
interface Iprops {
  loading: boolean
}
class MainPage extends Component<Iprops> {
  render() {
    const { loading } = this.props
    return (
      <Fragment>
        <Segment>
          {loading && <Dimmer active inverted>
            <Loader>로딩중</Loader>
          </Dimmer>}
          <Container>
            <div style={{ margin: 25 }}>
              <Header as='h2' icon textAlign='center'>
                <Image
                  centered
                  size='big'
                  src='/images/volunteer.gif'
                />
                <Header.Content>최신 봉사활동 정보</Header.Content>
              </Header>

            </div>

            <SearchBar />
            <Grid >
              <ModalForm />
            </Grid>

          </Container>

          <Tab />
        </Segment >
      </Fragment >
    );
  }
}
export default connect(
  ({ user }: any) => {
    return {
      loading: user.get("loading"), // user에 있는 loading
    };
  },
  dispatch => ({
    VolActions: bindActionCreators(volActions, dispatch),
    SearchActions: bindActionCreators(searchActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(MainPage);




