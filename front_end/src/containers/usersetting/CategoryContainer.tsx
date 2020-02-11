import React, { Component, Fragment } from "react";
import {
    Dropdown
} from "semantic-ui-react";
import temp2 from "components/usersetting/temp2.json"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActions from "redux/modules/search";
interface Props {
    categorys: any;
    SearchActions: any;
    input: any;
}
interface State { }
class CategorySelection extends Component<Props, State> {
    state = {};
    handleChange = (e: any, data: any) => {
        const { SearchActions, categorys } = this.props;
        const check = categorys.filter((category: any) => category.text === data.value);
        if (check.size === 0 && categorys.size < 3) {
            SearchActions.changeInput({ value: data.value, id: "input" });
            if (e.key !== "ArrowDown" && e.key !== "ArrowUp") {
                if (data.value !== []) {
                    SearchActions.insert({ form: 'category', text: data.value });
                    SearchActions.changeInput({ value: "", id: "input" });
                }
            }
        };
    }
    handleInsert = () => {
        const { SearchActions, input } = this.props;
        SearchActions.insert({ form: 'category', text: input });
        SearchActions.changeInput({ value: "", id: "input" });
    };
    handleRemove = (id: number) => {
        const { SearchActions } = this.props;
        SearchActions.remove({ form: 'category', id: id });
    };
    handleKeyDown = (event: any, data: any) => {
        const { SearchActions, categorys, input } = this.props;
        if (event.key === "Enter") {
            const check = categorys.filter((category: any) => category.text === input);
            if (check.size === 0 && categorys.size < 3) {
                if (input !== "") {
                    SearchActions.insert({ form: 'category', text: input });
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
        const { categorys, input } = this.props;
        const categoryItems = categorys.map((category: any) => {
            const { id, checked, text } = category;
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
                        placeholder="선호하는 봉사 종류를 입력해주세요."
                        search
                        selection
                        onChange={handleChange}
                        options={temp2}
                        onKeyDown={handleKeyDown}
                    // disabled={todos.size === 3}
                    ></Dropdown>
                </div>
                <ul>{categoryItems}</ul>
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
        categorys: search.get("categorys")
    }),
    dispatch => ({
        SearchActions: bindActionCreators(searchActions, dispatch)
    })
)(CategorySelection);
