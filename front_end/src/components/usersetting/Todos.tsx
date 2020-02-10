import React, { ReactElement, Fragment } from 'react'
import { Dropdown, DropdownItemProps } from 'semantic-ui-react'
import axios from 'axios';
import temp from './temp.json'
const TodoItem = ({ id, text, checked, onToggle, onRemove }: any) => (
    <li
        style={{
            textDecoration: checked ? 'line-through' : 'none'
        }}
        onClick={() => onToggle(id)}
        onDoubleClick={() => onRemove(id)}>
        {text}
    </li>
)

const Search = ({ todos, input, onInsert, onToggle, onRemove, onChange, placeholder }: any) => {

    const todoItems = todos.map(
        (todo: any) => {
            const { id, checked, text } = todo;
            return (
                <TodoItem
                    id={id}
                    checked={checked}
                    text={text}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    key={id}
                />
            )
        }
    )
    return (
        <div>
            <h2>오늘 할 일</h2>
            <input value={input} onChange={onChange} placeholder={placeholder} />
            <button onClick={onInsert}>추가</button>
            <ul>
                {todoItems}
            </ul>
        </div>
    );
};



const Todos = ({ placeholder, todos, input, onInsert, onToggle, onRemove, onChange }: any) => {
    // const optionlist = () => axios.get('./temp.json')

    const todoItems = todos.map(
        (todo: any) => {
            const { id, checked, text } = todo;
            return (
                <TodoItem
                    id={id}
                    checked={checked}
                    text={text}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    key={id}
                />
            )
        }
    )
    return (
        <Fragment>
            <Dropdown
                placeholder={placeholder}
                search
                selection
                onChange={onChange}
                options={temp}
                onClick={onInsert}

            />

            <button onClick={onInsert}>추가</button>
            <ul>
                {todoItems}
            </ul>
        </Fragment>
    )

}
export default Todos;

