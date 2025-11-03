import { combineReducers, createStore } from "redux";
import { expenseReducer } from "./reducer/expenseReducer";


const rootReducer = combineReducers({
    expenses : expenseReducer,
})
const store = createStore(rootReducer);

export default store;