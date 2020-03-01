import React, { Component } from "react";
import { Route, BrowserRouter,Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import 'shared/Router.scss';
// auth
import Join from "containers/join/Join";
import JoinComplete from "containers/join/JoinComplete";
import EmailComplete from "containers/join/EmailComplete";

import MailReSend from "containers/mailresend/MailReSend";

import Login from "containers/login/Login";

import FindPassword from "containers/findPassword/FindPassword";
import FindPasswordMailSend from "containers/findPassword/FindPasswordMailSend";

// user
import Mypage from "containers/mypage/Mypage";
import FindPasswordMailRecieve from "containers/findPassword/FindPasswordMailRecieve";

// curation
import Intro from "containers/intro/Intro";
import MainPage from "containers/mainpage/MainPage";
import UserSettingPage from "containers/usersetting/UserSettingPage";
import CalendarContainer from "containers/calendar/CalendarContainer";

import VolDetail from "components/vol/VolDetail";

import Feed from "containers/feed/Feed";
import PostingList from "containers/posting/PostingList";
import PostingForm from "containers/posting/PostForm";
import HeaderForMobile from "components/header/HeaderForMobile";
import Withdraw from "containers/usersetting/Withdraw";
import FooterForDesktop from "components/footer/FooterForDesktop";
import FooterForMobile from "components/footer/FooterForMobile";
import HeaderForDesktop from "components/header/HeaderForDesktop";
import LoginChecker from "components/loginchecker/LoginChecker";
import WithdrawComplete from "containers/usersetting/WithdrawComplete";
import OthersPage from "containers/otherspage/OthersPage";
import FollowingPage from "containers/followpage/FollowingPage"
import FollowerPage from "containers/followpage/FollowerPage"


const filterPathname = (path:string) => {
  return path.split('/')[3];
}
const direction_old = (path: string)=>{
  let pagepath = filterPathname(path);
  console.log("여기",pagepath)
  // 왼쪽으로 이동 : mainpage , feed, mypage, userpage
  if(pagepath === 'mainpage' || pagepath === 'feed' || pagepath === 'mypage' || pagepath === 'user'){
    return 'transiton-page-left'
  }else if(pagepath === 'vol'){
    return 'transiton-page-left'
  }else{
    return 'transiton-page-disappear'
  }
}



class Router extends Component {
  direction = (history : any) => {
    if (history.action === "POP") {
      return 'transiton-page-right'
    }else{
      return 'transiton-page-left'
    }
  };
  render() {
    return (
      <BrowserRouter>
      {/* 로그인 해야 접근 가능 페이지 ooo 표시 */}
      
      {/* 로그인체크  */}
      <Route path="/" component={LoginChecker} />

      {/* 헤더 */}
      <Route path="/" component={HeaderForDesktop} />
      <Route path="/" component={HeaderForMobile} />
      
      {/* 시작페이지 */}
      <Route exact path="/" component={Intro} />

      {/* 로그인 */}
      <Route exact path="/login" component={Login} />

      {/* 회원가입 */}
      <Route exact path="/join" component={Join} />
      <Route path="/join/complete" component={JoinComplete} />

      {/* 이메일 인증 */}
      <Route path="/email/:email/:key" component={EmailComplete} />
      <Route path="/mailresend" component={MailReSend} />

      {/* 비밀번호찾기 */}
      <Route path="/findpassword" component={FindPassword} />
      <Route path="/findpasswordmailsend" component={FindPasswordMailSend} />

      {/* 회원 정보 ooo */}
      <Route path="/changepassword/:token" component={FindPasswordMailRecieve} />
      <Route exact path="/usersetting" component={UserSettingPage} />
      <Route path="/withdraw" component={Withdraw} />

      {/* curation ooo */}
      
      <Route path="/calendar" component={CalendarContainer} />
      <Route exact path="/:id/postinglist" component={PostingList} />
      <Route exact path="/vol/:id/write" component={PostingForm} />

      {/* 다른회원 정보 ooo */}
      <Route path="/follower/:id" component={FollowerPage}/>
      <Route path="/following/:id" component={FollowingPage}/>

      {/* 회원탈퇴 완료 */}
      <Route path="/withdrawcomplete" component={WithdrawComplete} />

      
      

      {/* 동적으로 화면 전환이 일어나는 페이지 */}
      <Route render={({location, history})=>{
        const currentLocation = window.location.href;
        return(
        <TransitionGroup>
        <CSSTransition key={location.pathname} classNames={this.direction(history)} timeout={300}>
          <Switch location={location}>
          {/* 이 안에 <Route />를 넣으면 됩니다. */}
          
          {/* 메인페이지 */}
          <Route exact path="/mainpage" component={MainPage} />

          {/* 피드페이지 */}
          <Route exact path="/feed" component={Feed} />

          {/* 마이페이지 */}
          <Route exact path="/mypage" component={Mypage} />

          {/* 유저페이지 */}
          <Route path="/user/:id" component={OthersPage}/>

          {/* 봉사 상세정보 페이지 */}
          <Route exact path="/vol/:id/detail" component={VolDetail} /> 
          

          </Switch>
          </CSSTransition>
        </TransitionGroup>
        )
      }}/>

      {/* footer */}
      <Route path="/" component={FooterForDesktop} />
      <Route path="/" component={FooterForMobile} />
      
      </BrowserRouter>
    );
  }
}

export default Router;
