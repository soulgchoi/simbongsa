import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "shared/App";
import { Provider } from "react-redux";

const Root = (s2: any) => {
  console.log("Root: ", s2);
  return (
    <Provider store={s2.store}>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
