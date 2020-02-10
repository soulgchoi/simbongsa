import React from "react";
import ReactDOM from "react-dom";
import Root from "client/Root";
import * as serviceWorker from "serviceWorker";
import store from "redux/configureStore";
<<<<<<< HEAD
import 'semantic-ui-css/semantic.min.css'
console.log("index: ", store);
=======
// console.log("index: ", store);
>>>>>>> 5a5c88a761fbff973ce598349877db8be8f4615a
ReactDOM.render(<Root store={store} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
