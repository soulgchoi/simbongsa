import React, { ReactElement, Fragment } from 'react'
import { Dropdown, DropdownItemProps } from 'semantic-ui-react'

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
    console.log("place", placeholder)
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



const Todos = ({ placeholder, optionlist, todos, input, onInsert, onToggle, onRemove, onChange }: any) => {

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
                options={optionlist}
            />

            <button onClick={onInsert}>추가</button>
            <ul>
                {todoItems}
            </ul>
        </Fragment>
    )

}
export default Todos;

