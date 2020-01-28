import React, { Component } from "react";
import { Route } from "react-router-dom";

import Login from "components/login/Login";
import Join from "components/join/Join";
import FindPassword from "components/findPassword/FindPassword";
import JoinComplete from "components/join/JoinComplete";
import MailReSend from "components/mailresend/MailReSend";
import FindPasswordMailSend from "components/findPassword/FindPasswordMailSend";
import TemporaryDrawer from "components/navi/TemporaryDrawer";

class App extends Component {
  render() {
    return (
      <div>
        <TemporaryDrawer></TemporaryDrawer>
        <Route exact path="/" component={Login} />
        <Route exact path="/join" component={Join} />
        <Route path="/findpassword" component={FindPassword} />
        <Route path="/findpasswordmailsend" component={FindPasswordMailSend} />
        <Route path="/join/complete" component={JoinComplete} />
        <Route path="/mailresend" component={MailReSend} />
      </div>
    );
  }
}

export default App;
