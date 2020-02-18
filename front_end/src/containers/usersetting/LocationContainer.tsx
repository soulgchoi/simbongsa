import React, { Component, Fragment } from "react";
import {
  Dropdown
} from "semantic-ui-react";
import temp from "components/usersetting/temp.json";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActions from "redux/modules/search";
import { Button } from "semantic-ui-react"
interface Props {
  locations: any;
  SearchActions: any;
  input: any;
  key: any;
}
interface State { }
class Locationcontainer extends Component<Props, State> {
  state = {};
  handleChange = (e: any, data: any) => {
    const { SearchActions, locations } = this.props;
    const splitValue = data.value.split('/')
    const check = locations.filter((location: any) => location.text === splitValue[1]);
    if (check.size === 0 && locations.size < 3) {
      SearchActions.changeInput({ input: splitValue[1], key: splitValue[0] });
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") {
        console.log("data.value", data.value)
        if (data.value !== []) {
          SearchActions.insert({ form: "location", text: splitValue[1], key: splitValue[0] });
          SearchActions.changeInput({ input: "", key: '' });
        }
      }
    };
  }
  handleInsert = () => {
    const { SearchActions, input, key } = this.props;
    SearchActions.insert({ form: "location", text: input, key: key });
    SearchActions.changeInput({ input: "", key: '' });
  };
  handleRemove = (id: number) => {
    const { SearchActions } = this.props;
    SearchActions.remove({ form: "location", id: id });
  };
  handleKeyDown = (event: any) => {
    const { SearchActions, locations, input, key } = this.props;
    if (event.key === "Enter") {

      const check = locations.filter((location: any) => location.text === input);
      if (check.size === 0 && locations.size < 3) {
        if (input !== "") {
          SearchActions.insert({ form: "location", text: input, key: key });
          SearchActions.changeInput({ value: "", key: "" });
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
    const { locations, input, key } = this.props;

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
        <div style={{ "margin": 1 }} >
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
        {locationItems}
      </Fragment>
    );
  }
}
const LocationItem = ({ id, text, onRemove }: any) => (
  <div>
    <ul
      style={{
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'flex-start',
        padding: 0
      }}
    >
      {text} <Button color='orange' size='mini' onClick={() => onRemove(id)} >삭제하기</Button>
    </ul >

  </div >
);
export default connect(
  ({ search }: any) => ({
    input: search.get("input"),
    locations: search.get("locations"),
    key: search.get("key")
  }),
  dispatch => ({
    SearchActions: bindActionCreators(searchActions, dispatch)
  })
)(Locationcontainer);
