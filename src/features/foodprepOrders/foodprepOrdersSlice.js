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
            state.orders = action.payload;
        },
        addOrder: (state,action) => {
            state.orders.push(action.payload.order);
        },
        editOrderStatus: (state, action) => {
            state.orders.find(order => order._id === action.payload._id).status = action.payload.newStatus;
        },
        removeOrder: (state, action) => {
            state.orders = state.orders.filter(order => order._id !== action.payload._id);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action) => {
            return state = {
                ...state,
                ...action.payload.foodprep
            }
        })
    }
});

export const { setOrders, addOrder, editOrderStatus, removeOrder } = foodprepOrdersSlice.actions;

export const selectReceivedOrders = (state) => state.foodprep?.orders.filter(order => order.status === "Received");
export const selectPreparingOrders = (state) => state.foodprep?.orders.filter(order => order.status === "Preparing");
export const selectReadyOrders = (state) => state.foodprep?.orders.filter(order => order.status === "Ready");

export default foodprepOrdersSlice.reducer;