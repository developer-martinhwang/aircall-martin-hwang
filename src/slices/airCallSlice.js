import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import 'regenerator-runtime/runtime';
import AirCallService  from '../services/airCallService';
const initialState = [];
export const retrieveCalls = createAsyncThunk(
    "airCall/retrieveCalls",
    async () => {
        const res = await AirCallService.getAll();
        return res.data;
    }
);
export const retrieveCall = createAsyncThunk(
    "airCall/retrieveCall",
    async (id) => {
        const res = await AirCallService.get(id);
        return res.data;
    }
);
export const resetCall = createAsyncThunk(
    "airCall/resetCall",
    async () => {
        const res = await AirCallService.reset();
        return res.data;
    }
);
export const updateCall = createAsyncThunk(
    "airCall/updateCall",
    async () => {
        const res = await AirCallService.update(id, data);
        return res.data;
    }
)
export const airCallSlice = createSlice({
    name: 'airCall',
    initialState,
    extraReducers: {
        [retrieveCalls.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [resetCall.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [retrieveCall.fulfilled]: (state, action) => {
            return [...action.payload];
        },
    }
});
const { reducer} = airCallSlice;
export default reducer;