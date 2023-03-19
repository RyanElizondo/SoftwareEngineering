import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    "items": []
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addItem: (state,action) => {
            state.items.push(action.payload.item);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.cartId !== action.payload.cartId)
                .map( (item,index) => item = {...item, cartId: index + 1} );
        }
    }
})

export const { addItem, removeItem } = orderSlice.actions;
export const selectItems = (state) => state.order.items;
export const selectCartId = (state) => state.order.items?.length + 1;//state.items !== null || state.items !== undefined ? state.items.length : 0;
export const selectItem = (state, id) => state.order.items.find(item => item.id === id);
export default orderSlice.reducer;