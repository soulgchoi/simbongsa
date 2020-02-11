import React, { Component, Fragment } from "react";
import {
  Dropdown,
  DropdownItemProps,
  DropdownMenu,
  DropdownItem
} from "semantic-ui-react";
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
  handleChange = (e: any, data: any) => {
    const { TodoActions, todos } = this.props;
    const check = todos.filter((todo: any) => todo.text === data.value);
    if (check.size === 0) {
      TodoActions.changeInput(data.value);
      if (e.nativeEvent !== null) {
        TodoActions.insert(data.value);
        TodoActions.changeInput("");
      }
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
  handleKeyDown = (event: any) => {
    const { TodoActions, todos, input } = this.props;
    if (event.key === "Enter") {
      const check = todos.filter((todo: any) => todo.text === input);
      if (check.size === 0) {
        TodoActions.insert(input);
        TodoActions.changeInput("");
      }
    }
  };
  render() {
    const {
      handleChange,
      handleInsert,
      handleToggle,
      handleRemove,
      handleKeyDown
    } = this;
    const { todos, TodoActions, input } = this.props;
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
    console.log("렌더링", input);
    console.log(todos.size);
    return (
      <div>
        <Fragment>
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
    input: todo.get("input"),
    todos: todo.get("todos")
  }),
  dispatch => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(Todos);
