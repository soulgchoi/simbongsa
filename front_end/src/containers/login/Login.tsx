import React from "react";
import PV from "password-validator";
import {
  Grid,
  Image,
  Header,
  Form,
  Segment,
  Button,
  Message,
  Container
} from "semantic-ui-react";
import locationAllList from "lib/json/temp.json";
import categoryAllList from "lib/json/searchCategory.json";
import './Login.css';

// import KakaoLogin from "components/user/snsLogin/Kakao";
// import GoogleLogin from "components/user/snsLogin/Google";
import GoogleLogin from "react-google-login";

import ReactCountUp from "react-countup";
import ScrollAnimation from "react-animate-on-scroll";
//@ts-ignore
import ReactPageScroller from "react-page-scroller"; // @types/react-page-scroller 가 없어서 위에 // @ts-ignore 를 추가

// 직접 제작한 Components
import LinkButton from "components/button/LinkButton";
import ActionButton from "components/button/ActionButton";
import Input from "components/input/Input";
import AuthError from "components/error/AuthError";
// local storage에 저장하는 component

// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import * as userActions from "redux/modules/user";
import * as baseActions from "redux/modules/base";
import * as volActions from "redux/modules/vol";
import * as searchActions from "redux/modules/search";
import storage from "lib/storage";
import validator from "validator";
import { Link } from 'react-router-dom'

// jwt
import jwt from "jsonwebtoken";

interface validate {
  [name: string]: (value: string) => boolean;
}

class Login extends React.Component<any, any> {
  validate: validate = {
    email: (value: string) => {
      if (!validator.isEmail(value)) {
        this.setError("잘못된 이메일 형식 입니다.", "email");
        return false;
      }
      this.setError(null, "email");
      return true;
    },
    password: (value: string) => {
      if (!validator.isLength(value, { min: 8 })) {
        this.setError("비밀번호를 8자 이상 입력하세요.", "password");
        return false;
      }
      this.setError(null, "password"); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
      return true;
    }
  };

  async componentDidMount() {
    const { SearchActions, AuthActions, UserActions } = this.props;
    // const { id_token } = this.props.match.params;
    const hash = window.location.hash;
    if (hash.length > 0) {
      const splitedHash = hash.split("id_token=");
      if (splitedHash.length > 1) {
        const id_token = splitedHash[1].split("&")[0];
        await AuthActions.googleLogin(id_token);
        console.log("로그인페이지 마운트", id_token);
        console.log("리저트", this.props.result.toJS());
        const token = this.props.result.toJS().token;
        console.log("톡ㅋ토", token);
        const userEmail = jwt.decode(token);
        await UserActions.setLoggedInfo(userEmail);
        storage.set("token", token);
      }
      const token = storage.get("token");
      if (token !== null && token !== "undefined") {
        this.props.history.push("/mainpage");
      }
    }
  }

  handleChange = (e: any) => {
    const { AuthActions } = this.props;
    const { id, value } = e.target;
    AuthActions.changeInput({
      id,
      value,
      form: "login"
    });

    const validation = this.validate[id](value);
    if (!validation) return;
  };

  // 컴포넌트가 종료될때 로그인 폼을 초기화 시킨다.
  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeForm("login");
  }

  // 에러 메세지 설정

  setError = (message: any, name: string) => {
    const { AuthActions } = this.props;
    AuthActions.setError({
      form: "login",
      message,
      name
    });
    return false;
  };

  // 로그인 처리

  handleLocalLogin = async () => {
    const { form, AuthActions, UserActions, history } = this.props;
    const { email, password } = form.toJS();
    // 로그인을 시도
    // console.log("메일 비번", email, password);
    try {
      await AuthActions.localLogin({ email, password });
      if (this.props.result === "EmailAuthenticateNeed") {
        history.push("/mailresend");
        return;
      }
      console.log("최초확인용", this.props.result.toJS());
      const token = this.props.result.toJS().token;
      const loggedInfo = jwt.decode(token);
      console.log("유저이메일", loggedInfo);
      UserActions.setLoggedInfo(loggedInfo);
      // UserActions.setLoggedFlag(true);
      storage.set("token", token);
      const { userId } = this.props
      console.log("userId", userId)
      await UserActions.setPreferInfo(userId);
      const { preferInfo } = this.props
      console.log("preferInfo", preferInfo)
      this.initializePreferInfo(preferInfo)

      await this.initialSearch()
      history.push("/mainpage");
    } catch (e) {
      // error 발생시
      console.log(e);
      this.setError("잘못된 계정정보입니다.", "email");
    }
  };
  initialSearch = () => {
    const { input, VolActions, locations, categorys, times } = this.props
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
    VolActions.getVolList({ input: input, firstLocation: firstLocation, secondLocation: secondLocation, thirdLocation: thirdLocation, firstCategory: firstCategory, secondCategory: secondCategory, thirdCategory: thirdCategory, bgnTm: bgnTm, endTm: endTm })
    VolActions.getInitailList({ input: input, firstLocation: firstLocation, secondLocation: secondLocation, thirdLocation: thirdLocation, firstCategory: firstCategory, secondCategory: secondCategory, thirdCategory: thirdCategory, bgnTm: bgnTm, endTm: endTm, pageNum: 1 })
  }
  initializePreferInfo = (preferInfo: any) => {
    const { SearchActions } = this.props;
    if (preferInfo) {
      console.log("preferInfo APP에서", preferInfo.toJS());
      const info = preferInfo.toJS();

      // 시간 관련
      if (info.bgnTm === "00:00:00") {
        SearchActions.initialInsert({
          form: "times",
          key: "morning",
          value: true
        });
      } else {
        SearchActions.initialInsert({
          form: "times",
          key: "morning",
          value: false
        });
      }
      if (info.endTm === "23:59:59") {
        SearchActions.initialInsert({
          form: "times",
          key: "afternoon",
          value: true
        });
      } else {
        SearchActions.initialInsert({
          form: "times",
          key: "afternoon",
          value: false
        });
      }
      // 나이 관련
      const today = new Date();
      const year = today.getFullYear();
      if (!info.age) {
        SearchActions.initialInsert({
          form: "ages",
          key: "adult",
          value: false
        });
        SearchActions.initialInsert({
          form: "ages",
          key: "youth",
          value: false
        });
      } else {
        const age = Number(info.age.split("-")[0]);
        const result = Math.abs(age - year);
        console.log("초기 year, age", year, age);
        if (result > 18) {
          SearchActions.initialInsert({
            form: "ages",
            key: "adult",
            value: true
          });
          SearchActions.initialInsert({
            form: "ages",
            key: "youth",
            value: false
          });
        } else if (0 < result && result <= 18) {
          SearchActions.initialInsert({
            form: "ages",
            key: "adult",
            value: false
          });
          SearchActions.initialInsert({
            form: "ages",
            key: "youth",
            value: true
          });
        } else {
          SearchActions.initialInsert({
            form: "ages",
            key: "adult",
            value: false
          });
          SearchActions.initialInsert({
            form: "ages",
            key: "youth",
            value: false
          });
        }
      }

      for (let j = 0; j < info.preferRegion.length; j++) {
        //지역 관련
        console.log("for문 도는중");
        const splitValue = locationAllList[
          info.preferRegion[j] - 1
        ].value.split("/");
        console.log(splitValue[1], splitValue[0]);
        SearchActions.insert({
          form: "location",
          text: splitValue[1],
          key: splitValue[0]
        });
      }

      // 봉사활동 카테고리 관련
      for (let j = 0; j < info.preferCategory.length; j++) {
        const number: keyof typeof categoryAllList = info.preferCategory[j]
        SearchActions.insert({
          form: "category",
          text: categoryAllList[number],
          key: number
        });
      }
    }
  }
  handleGoogleLogin = async (response: any) => {
    const { AuthActions, UserActions, history } = this.props;
    // 구글로그인 성공할 경우 response로 로그인 정보가 담긴 객체 하나를 준다.
    const id_token = response.getAuthResponse().id_token;
    // 그 중 id_token 에 담긴 구글 로그인 정보를 백엔드에 전달해 줌.
    await AuthActions.googleLogin(id_token);
    const token = this.props.result.toJS().token;
    const userEmail = jwt.decode(token);
    UserActions.setLoggedInfo(userEmail);
    storage.set("token", token);
    history.push("/mainpage");
  };

  render() {
    console.log(this.props.loggedInfo.toJS());
    const { email, password } = this.props.form.toJS(); // form 에서 email 과 password 값을 읽어옴
    const { handleChange, handleLocalLogin, handleGoogleLogin } = this;
    const error = this.props.error.toJS();
    // const pagesNumbers = this.getPagesNumbers();
    return (
      <div>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            {/* <Header as="h2" color="orange" textAlign="center"> */}
              <Image centered size="tiny" src="/images/logo1.png" />
            {/* </Header> */}
            <Form size="large">
              <Segment stacked>
                <AuthError error={error.email} />
                <Form.Input
                  fluid
                  icon="user"
                  id="email"
                  value={email}
                  iconPosition="left"
                  placeholder="이메일을 입력하세요."
                  onChange={handleChange}
                />
                <AuthError error={error.password} />
                <Form.Input
                  fluid
                  id="password"
                  icon="lock"
                  value={password}
                  iconPosition="left"
                  placeholder="비밀번호를 입력하세요."
                  type="password"
                  onChange={handleChange}
                />

                <Button
                  className="login"
                  inverted
                  valuex="true"
                  fluid
                  size="large"
                  onClick={handleLocalLogin}
                >
                  로그인
                </Button>
              
              </Segment>
            </Form>
            <Container textAlign="right">
              <GoogleLogin
                icon={true}
                clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID!}
                onSuccess={handleGoogleLogin}
                onFailure={result => console.log(result)}
                cookiePolicy={"single_host_origin"}
                responseType="id_token"
                buttonText="구글 계정으로 로그인"
                uxMode="redirect"
                redirectUri={process.env.REACT_APP_FRONT_URI + "/login"}
              />
            </Container>
            <div className="authlink">
              <div>
                <span className="message">비밀번호를 잊으셨나요?</span>
                <Link to="/findpassword"><a className="link">비밀번호 찾기</a></Link>
                <br/>
              </div>
              <div>
                <span className="message">아직 심봉사의 회원이 아니세요?</span>
                {/* <LinkButton placeholder="회원가입" link="/join" /> */}
                <Link to="/join"><a className="link">회원가입</a></Link>
              </div>
            </div>
            {/* <Message>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <LinkButton
                      link="/findpassword"
                      inverted={true}
                      placeholder="비밀번호 찾기"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <LinkButton placeholder="회원가입" link="/join" />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Message> */}
          </Grid.Column>
        </Grid>
        {/* <Grid columns={2} centered>
          <Grid.Row>
            <h1 className="title">로그인</h1>
          </Grid.Row>
          <Grid.Row>
            <Input
              id="email"
              nametag="ID"
              placeholder="아이디를 입력하세요."
              type="text"
              value={email}
              onChange={handleChange}
            />
          </Grid.Row>
          <Grid.Row>
            <Input
              id="password"
              nametag="password"
              placeholder="비밀번호를 입력하세요."
              type="password"
              value={password}
              onChange={handleChange}
            />
            <AuthError error={error2.email}></AuthError>
          </Grid.Row>
          <Grid.Row>
            <ActionButton
              placeholder="로그인"
              action={handleLocalLogin}
            ></ActionButton>
          </Grid.Row>
          <Grid.Row>
            <div>
              <div className="text">
                <p>SNS 간편 로그인</p>
                <div className="bar"></div>
              </div>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID!}
                onSuccess={handleGoogleLogin}
                onFailure={result => console.log(result)}
                cookiePolicy={"single_host_origin"}
                redirectUri={process.env.REACT_APP_FRONT_URI}
              />
            </div>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column centered>
              <LinkButton link="/findpassword" placeholder="비밀번호 찾기" />
            </Grid.Column>
            <Grid.Column centered>
              <LinkButton placeholder="회원가입" link="/join" />
            </Grid.Column>
          </Grid.Row>
        </Grid> */}

        {/* <div id="page">
          <div id="content">
            <ReactCountUp
              start={this.props.initialNumber}
              end={12546}
              duration={2}
              separator=","
              prefix="등록 된 봉사활동 수 : "
              suffix=" 개"
              redraw={true}
            ></ReactCountUp>
          </div>
        </div>
        <div id="page">
          <div id="content">
            <ReactCountUp
              start={this.props.initialNumber}
              end={12546}
              duration={2}
              separator=","
              redraw={true}
              prefix="게시글  "
              suffix=" 개"
            />
          </div>
        </div> */}
        {/* </ReactPageScroller> */}
      </div>
    );
  }
}
// State와 action을 연결짓는 connect
export default connect(
  (state: any) => ({
    // props로 받아오는 정보들...
    form: state.auth.getIn(["login", "form"]),
    error: state.auth.getIn(["login", "error"]),
    result: state.auth.get("result"),
    logged: state.user.get("logged"),
    loggedInfo: state.user.get("loggedInfo"),
    initialNumber: state.base.get("initialNumber"),
    userId: state.user.getIn(["loggedInfo", "userId"]),
    preferInfo: state.user.getIn(["loggedInfo", "preferInfo"]),
    volunteers: state.vol.get("volunteers"), // store에 있는 state를 this.pros로 연결
    input: state.search.get("input"),
    loading: state.user.get('loading'),
    locations: state.search.get("locations"),
    categorys: state.search.get("categorys"),
    times: state.search.get("times"),
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
    SearchActions: bindActionCreators(searchActions, dispatch),
    VolActions: bindActionCreators(volActions, dispatch)
  })
)(Login);
