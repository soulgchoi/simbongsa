import { createAction, handleActions } from "redux-actions";
import { Record, List, Map } from "immutable";
const CHANGE_INPUT = "searchlocation/CHANGE_INPUT";
const INSERT = "searchlocation/INSERT";
const TOGGLE = "searchlocation/TOGGLE";
const REMOVE = "searchlocation/REMOVE";
export const changeInput = createAction(CHANGE_INPUT);
export const insert = createAction(INSERT);
export const toggle = createAction(TOGGLE);
export const remove = createAction(REMOVE);
let idLocation = 0; // 아이템에 들어갈 고유 값 입니다
let idCategory = 0; // 아이템에 들어갈 고유 값 입니다
// Record 함수는 Record 형태 데이터를 만드는 함수를 반환합니다.
// 따라서, 만든 다음에 뒤에 () 를 붙여줘야 데이터가 생성됩니다.
const initialState = Record({
  input: "",
  locations: List(),
  categorys: List(),
  placeholder: "지역을 입력해주세요.",
  times: Map({
    morning: false,
    afternoon: false
  }),
  ages: Map({
    youth: false,
    adult: false
  }),
  error: null,
  startDate: new Date()
})();
// Todo 아이템의 형식을 정합니다.
const SearchLocationRecord = Record({
  id: idLocation++,
  text: "",
});
const SearchCategoryRecord = Record({
  id: idCategory++,
  text: "",
});
export default handleActions<any, any>(
  {
    [CHANGE_INPUT]: (state, action) => {
      console.log("change input", action.payload);
      const { id, value } = action.payload
      return state.set(id, value);
      // .set("placeholder", "지역을 입력해주세요.");
    },
    [INSERT]: (state, action) => {
      // Record 를 사용해야 아이템도 Record 형식으로 조회 가능합니다.
      // 빠져있는 값은, 기본값을 사용하게 됩니다 (checked: false)
      console.log("INSERT", state, action.payload);
      const { form, text } = action.payload
      console.log('form', form, 'text', text)
      if (form === 'location') {
        const item = SearchLocationRecord({ id: idLocation++, text });
        return state.update("locations", (locations: any) => locations.push(item));
      }
      else if (form === 'category') {
        const item = SearchCategoryRecord({ id: idCategory++, text });
        return state.update("categorys", (categorys: any) => categorys.push(item));
      }
      // .set("placeholder", "지역을 입력해주세요.");
    },
    [TOGGLE]: (state, action) => {
      const { id, value } = action.payload
      console.log(id, value)
      // console.log("timeName", timeName)
      // console.log(state)
      // console.log(state.times.get(timeName))
      return state.setIn(
        [id, value], !state.get(id).get(value)
      );
    },
    [REMOVE]: (state, action) => {
      const { form, id } = action.payload
      if (form === 'location') {
        const index = state
          .get("locations")
          .findIndex((item: any) => item.get("id") === id);
        return state.deleteIn(["locations", index]);
      }
      else if (form === 'category') {
        const index = state
          .get("categorys")
          .findIndex((item: any) => item.get("id") === id);
        return state.deleteIn(["categorys", index]);
      }

    }
  },
  initialState
);
