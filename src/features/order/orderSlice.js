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
export const selectNumItems = (state, id) => state.order.items.length;
export const selectOrderSubtotal = (state) => state.order.items.reduce( (prev, curr) => prev + curr.price, 0).toFixed(2);
export const selectOrderTotal = (state) => ((state.order.items.reduce( (prev, curr) => prev + curr.price, 0) * 1.0625)).toFixed(2);
export const selectOrderTax = (state) => ((state.order.items.reduce( (prev, curr) => prev + curr.price, 0) * 0.0625)).toFixed(2);
export default orderSlice.reducer;