import React, { Component } from 'react';
import Todos from 'components/usersetting/Todos';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'redux/modules/todo';

class TodosContainer extends Component<any, any> {

    handleChange = (e: any) => {
        const { TodoActions } = this.props;
        TodoActions.changeInput(e.target.value);
    }

    handleInsert = () => {
        const { TodoActions } = this.props;
        const { input } = this.props;
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

