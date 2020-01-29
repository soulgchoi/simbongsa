import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "shared/App";

// Root 컴포넌트는 React.FC 타입(FC : FunctionComponent)
const Root: React.FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;
