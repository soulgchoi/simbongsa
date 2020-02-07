import React from "react";
import ReactDOM from "react-dom";
import Root from "client/Root";
import * as serviceWorker from "serviceWorker";
import store from "redux/configureStore";
<<<<<<< HEAD
import 'semantic-ui-css/semantic.min.css';
console.log("index: ", store);
=======
// console.log("index: ", store);
>>>>>>> ea5230d97c2beafb607691fbf2f1e6fe59a9084a
ReactDOM.render(<Root store={store} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
