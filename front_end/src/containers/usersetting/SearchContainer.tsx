import React, { Component } from "react";
import { SearchSelection, CheckBox } from "components/usersetting";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActions from 'redux/modules/search';
import CheckboxContainer from "./CheckboxContainer";
import AgeContainer from "./AgeContainer";
import CategoryContainer from "./CategoryContainer";
export default class SearchContainer extends Component<any, any> {
  render() {
    return (
      <div>
        <SearchSelection />
        <CheckboxContainer />
        <AgeContainer />
        <CategoryContainer />
      </div>
    )
  }
}

