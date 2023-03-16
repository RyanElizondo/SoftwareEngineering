import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    "items": []
}

export const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        addItem: (state,action) => {
            state.items.push(action.payload);
        },
        editItem: (state,action) => {
            //overwrite item in customer's cart
            state.items.find( item => item.id === action.payload.id).id = action.payload.id;
        },
        removeItem: (state, action) => {
            state.items.filter(item => item.id !== action.payload.id);
        }
    }
})

export const { addItem, editItem, removeItem } = orderSlice.actions;
export const selectItems = (state) => state.order.items;
export const selectCartId = (state) => state.order.items?.length + 1;//state.items !== null || state.items !== undefined ? state.items.length : 0;
export const selectItem = (state, id) => state.order.items.find(item => item.id === id);
export default orderSlice.reducer;