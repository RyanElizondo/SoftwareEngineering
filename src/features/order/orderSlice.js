import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {HYDRATE} from "next-redux-wrapper";

const initialState = {
    "items": []
}

export const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        addItem: (state,action) => {
            state.push(action.payload);
        },
        editItem: (state,action) => {
            //overwrite item in customer's cart
            state.find( item => item.id === action.payload.id).id = action.payload.id;
        },
        removeItem: (state, action) => {
            state.filter(item => item.id !== action.payload.id);
        }
    },
    // Special reducer for hydrating the state
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.items, //possible error. change to payload
            };
        },
    }
})

export const { addItem, editItem, removeItem } = orderSlice.actions;
export const selectItems = (state) => state.items;
export const selectItem = (state, id) => state.items.find(item => item.id === id);
export default orderSlice.reducer;