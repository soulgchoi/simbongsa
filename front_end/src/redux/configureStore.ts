import { createStore, applyMiddleware, compose } from "redux";
import penderMiddleware from "redux-pender";
import modules from "./modules";
// Store에 미들웨어를 적용하는 곳입니다!!!!
// 환경이 개발모드인지 확인합니다. REDUX_DEVTOOLS
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Todo: 미들웨어 적용
const configureStore = initialState => {
  const store = createStore(
    modules,
    initialState,
    composeEnhancers(applyMiddleware(penderMiddleware()))
  );
  return store;
};

export default configureStore;
