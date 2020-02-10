import React, { Component, Fragment } from "react";
import { Dropdown, DropdownItemProps } from "semantic-ui-react";
import axios from "axios";
import temp from "./temp.json";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as todoActions from "redux/modules/todo";

interface Props {
  todos: any;
  TodoActions: any;
  input: any;
}
interface State {}

class Todos extends Component<Props, State> {
  state = {};

  handleChange = (e: any) => {
    console.log("핸들 체인지 호출");
    const { TodoActions } = this.props;
    if (e.target.getElementsByTagName("span")[0]) {
      console.log(
        "event target",
        e.target.getElementsByTagName("span")[0].innerText
      );
      TodoActions.insert(e.target.getElementsByTagName("span")[0].innerText);
      const { input } = this.props;
    } else {
    }
  };

  handleInsert = () => {
    const { TodoActions, input } = this.props;
    TodoActions.insert(input);
    TodoActions.changeInput("");
  };

  handleToggle = (id: number) => {
    const { TodoActions } = this.props;
    TodoActions.toggle(id);
  };

  handleRemove = (id: number) => {
    const { TodoActions } = this.props;
    TodoActions.remove(id);
  };

  render() {
    const { handleChange, handleInsert, handleToggle, handleRemove } = this;
    const { todos, TodoActions } = this.props;
    const todoItems = todos.map((todo: any) => {
      const { id, checked, text } = todo;
      return (
        <TodoItem
          id={id}
          checked={checked}
          text={text}
          onToggle={handleToggle}
          onRemove={handleRemove}
          key={id}
        />
      );
    });
    return (
      <div>
        <Fragment>
          <Dropdown
            // placeholder={placeholder}
            placeholder="지역을 입력해주세요."
            search
            selection
            onChange={handleChange}
            options={temp}
            onKeyDown={(event: any) => {
              if (event.key === "Enter") {
                console.log(event.target.parentElement.childNodes[1].innerText);
                TodoActions.insert(
                  event.target.parentElement.childNodes[1].innerText
                );
              }
            }}
            // onSearchChange={handleChange}
            // onClick={(e: any) => {
            //   console.log(e.target);
            // }}
          />

          <button onClick={handleInsert}>추가</button>
          <ul>{todoItems}</ul>
        </Fragment>
      </div>
    );
  }
}

const TodoItem = ({ id, text, checked, onToggle, onRemove }: any) => (
  <li
    style={{
      textDecoration: checked ? "line-through" : "none"
    }}
    // onClick={() => onToggle(id)}
    // onDoubleClick={() => onRemove(id)}
  >
    {text}
  </li>
);

export default connect(
  ({ todo }: any) => ({
    input: todo.input,
    todos: todo.todos
  }),
  dispatch => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(Todos);
