import React, { Component } from "react";
import Todos from "components/usersetting/Todos";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as todoActions from "redux/modules/todo";

export default class TodosContainer extends Component<any, any> {
  render() {
    return <Todos />;
  }
}
