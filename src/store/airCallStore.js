import { configureStore } from "@reduxjs/toolkit";
import airCallReducer from "../slices/airCallSlice";
const reducer = {
    airCalls: airCallReducer,
}
const store = configureStore({
    reducer: reducer,
    devTools: true,
})
export default store;