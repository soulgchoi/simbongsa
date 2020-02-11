import React, { Component, Fragment } from "react";
import {
  Dropdown
} from "semantic-ui-react";
import temp from "./temp.json";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActions from "redux/modules/search";
interface Props {
  locations: any;
  SearchActions: any;
  input: any;
}
interface State { }
class SearchSelection extends Component<Props, State> {
  state = {};
  handleChange = (e: any, data: any) => {
    const { SearchActions, locations } = this.props;
    const check = locations.filter((location: any) => location.text === data.value);
    if (check.size === 0 && locations.size < 3) {
      SearchActions.changeInput({ value: data.value, id: "input" });
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") {
        console.log("data.value", data.value)
        if (data.value !== []) {
          SearchActions.insert({ form: 'location', text: data.value });
          SearchActions.changeInput({ value: "", id: "input" });
        }
      }
    };
  }
  handleInsert = () => {
    const { SearchActions, input } = this.props;
    SearchActions.insert({ form: 'location', text: input });
    SearchActions.changeInput({ value: "", id: "input" });
  };
  handleRemove = (id: number) => {
    const { SearchActions } = this.props;
    SearchActions.remove({ form: 'location', id: id });
  };
  handleKeyDown = (event: any, data: any) => {
    const { SearchActions, locations, input } = this.props;
    if (event.key === "Enter") {

      const check = locations.filter((location: any) => location.text === input);
      if (check.size === 0 && locations.size < 3) {
        if (input !== "") {
          SearchActions.insert({ form: 'location', text: input });
          SearchActions.changeInput({ value: "", id: "input" });
        }
      }
    }
  };
  render() {
    const {
      handleChange,
      handleRemove,
      handleKeyDown
    } = this;
    const { locations, input } = this.props;
    const locationItems = locations.map((location: any) => {
      const { id, checked, text } = location;
      return (
        <LocationItem
          id={id}
          checked={checked}
          text={text}
          onRemove={handleRemove}
          key={id}
        />
      );
    });


    return (

      <Fragment>
        <div style={{ "margin": 100 }} >
          <Dropdown
            // placeholder={placeholder}
            value={input}
            placeholder="지역을 입력해주세요."
            search
            selection
            onChange={handleChange}
            options={temp}
            onKeyDown={handleKeyDown}
          // disabled={todos.size === 3}
          ></Dropdown>
        </div>
        <ul>{locationItems}</ul>
      </Fragment>
    );
  }
}
const LocationItem = ({ id, text, onRemove }: any) => (
  <div>
    <li
      style={{

      }}
    >
      {text} <button onClick={() => onRemove(id)} >[삭제하기]</button>
    </li >

  </div>
);
export default connect(
  ({ search }: any) => ({
    input: search.get("input"),
    locations: search.get("locations")
  }),
  dispatch => ({
    SearchActions: bindActionCreators(searchActions, dispatch)
  })
)(SearchSelection);
