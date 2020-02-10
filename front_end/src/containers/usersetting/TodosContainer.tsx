import React, { Component } from 'react';
import Todos from 'components/usersetting/Todos';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'redux/modules/todo';

class TodosContainer extends Component<any, any> {

    handleChange = (e: any) => {
        const { TodoActions } = this.props;
        if (e.target.getElementsByTagName('span')[0].innerText) {
            console.log("event target", e.target.getElementsByTagName('span')[0].innerText);
            TodoActions.changeInput(e.target.getElementsByTagName('span')[0].innerText);
            const { input } = this.props;

        }
        else {

        }
    }

    handleInsert = () => {
        const { TodoActions, input } = this.props;
        TodoActions.insert(input);
        TodoActions.changeInput('');
    }

    handleToggle = (id: number) => {
        const { TodoActions } = this.props;
        TodoActions.toggle(id);
    }

    handleRemove = (id: number) => {
        const { TodoActions } = this.props;
        TodoActions.remove(id);
    }

    render() {
        const { handleChange, handleInsert, handleToggle, handleRemove } = this;

        const { input, todos } = this.props;

        return (
            <Todos
                input={input}
                todos={todos}
                onChange={handleChange}
                onInsert={handleInsert}
                onToggle={handleToggle}
                onRemove={handleRemove}
                placeholder='지역을 입력해주세요.'
            />
        );
    }
}

export default connect(
    ({ todo }: any) => ({
        input: todo.input,
        todos: todo.todos
    }),
    dispatch => ({
        TodoActions: bindActionCreators(todoActions, dispatch)
    })

)(TodosContainer);

