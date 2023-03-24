import { createSlice } from '@reduxjs/toolkit';
import  { HYDRATE } from 'next-redux-wrapper';
const initialState = {
    "orders": []
}

export const foodprepOrdersSlice = createSlice({
    name: 'foodprep',
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload.orders;
        },
        addOrder: (state,action) => {
            console.log(action.payload)
            console.log(action.payload.order);
            state.orders.push(action.payload.order);
        },
        editOrderStatus: (state, action) => {
            state.orders = state.find(order => order.orderID === action.payload.orderID).status = action.payload.newStatus;
        },
        removeOrder: (state, action) => {
            state.orders = state.filter(order => order.orderID !== action.payload.orderID);
        }
    },
    extraReducers: {
        [HYDRATE] : (state, action) => {
            return state = {
                ...state,
                ...action.payload.foodprep
            }
        }
    }
});

export const { addOrder, editOrderStatus, removeOrder } = foodprepOrdersSlice.actions;

export const selectReceivedOrders = (state) => state.foodprep?.orders.filter(order => order.status === "received");
export const selectPreparingOrders = (state) => state.foodprep?.orders.filter(order => order.status === "preparing");
export const selectReadyOrders = (state) => state.foodprep?.orders.filter(order => order.status === "ready");

export default foodprepOrdersSlice.reducer;