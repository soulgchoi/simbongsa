import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "containers/login/Login";
import Join from "containers/join/Join";
import FindPassword from "containers/findPassword/FindPassword";
import JoinComplete from "containers/join/JoinComplete";
import MailReSend from "containers/mailresend/MailReSend";
import FindPasswordMailSend from "containers/findPassword/FindPasswordMailSend";
import Calendar from "components/Calendar/Calendar";
import Location from "containers/location/Location";
import MainPage from "containers/mainpage/MainPage";
import VolDetail from "containers/mainpage/VolDetail";
import PostingForm from "containers/posting/PostingForm";
// import PostingItem from "containers/posting/PostingItem";
import CalendarContainer from "containers/calendar/CalendarContainer";
import UserSetting from "containers/usersetting/UserSetting"
// import Postings from "containers/posting/Postings"

// 직접 만든 component
import TemporaryDrawer from "components/navi/TemporaryDrawer";
import TodosContainer from "containers/usersetting/TodosContainer";

class App extends Component {
  render() {
    return (
      <div>
        <TemporaryDrawer />
        <Route exact path="/" component={Login} />
        <Route exact path="/join" component={Join} />
        <Route path="/findpassword" component={FindPassword} />
        <Route path="/findpasswordmailsend" component={FindPasswordMailSend} />
        <Route path="/join/complete" component={JoinComplete} />
        <Route path="/mailresend" component={MailReSend} />
        <Route path="/calendar" component={CalendarContainer} />
        <Route exact path="/mainpage" component={MainPage} />
        <Route exact path="/mainpage/detail/:voltitle" component={VolDetail} />
        <Route path="/location" component={Location} />
        <Route exact path="/vol/detail/:id" component={VolDetail} />
        <Route exact path="/write" component={PostingForm} />
        <Route exact path="/setting" component={UserSetting} />
        <Route exact path="/setting2" component={TodosContainer} />

      </div >
    );
  }
}

export default App;
