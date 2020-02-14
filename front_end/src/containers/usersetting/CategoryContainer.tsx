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
    key: any;
}
interface State { }
class CategorySelection extends Component<Props, State> {
    state = {};
    findKey = (options: any, value: any) => {
        const result = options.find((option: any) =>
            option.value === value
        )
        return result.key
    }
    handleChange = (e: any, data: any) => {
        const { SearchActions, categorys } = this.props;
        console.log("data", data)
        console.log(data.options)
        const splitValue = data.value.split('/')
        const check = categorys.filter((category: any) => category.text === splitValue[1]);

        if (check.size === 0 && categorys.size < 3) {

            SearchActions.changeInput({ input: splitValue[1], key: splitValue[0] });
            if (e.key !== "ArrowDown" && e.key !== "ArrowUp") {
                if (data.value !== []) {
                    SearchActions.insert({ form: "category", text: splitValue[1], key: splitValue[0] });
                    SearchActions.changeInput({ input: "", key: '' });
                }
            }

        };
    }
    handleInsert = () => {
        const { SearchActions, input, key } = this.props;
        SearchActions.insert({ form: "category", text: input, key: key });
        SearchActions.changeInput({ input: "", key: "" });
    }
    handleRemove = (id: number) => {
        const { SearchActions } = this.props;
        SearchActions.remove({ form: "category", id: id });
    };
    handleKeyDown = (event: any, data: any) => {
        const { SearchActions, categorys, input, key } = this.props;
        if (event.key === "Enter") {
            const check = categorys.filter((category: any) => category.text === input);
            if (check.size === 0 && categorys.size < 3) {
                if (input !== "") {
                    SearchActions.insert({ form: "category", text: input, key: key });
                    SearchActions.changeInput({ input: "", key: '' });
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
        const { categorys, input, key } = this.props;
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
                <div style={{ "margin": 25 }} >
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
        categorys: search.get("categorys"),
        key: search.get("key")
    }),
    dispatch => ({
        SearchActions: bindActionCreators(searchActions, dispatch)
    })
)(CategorySelection);
