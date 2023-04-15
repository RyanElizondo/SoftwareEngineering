import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import orderReducer from './features/order/orderSlice';
import foodprepReducer from './features/foodprepOrders/foodprepOrdersSlice'

const makeStore = () => {
    const store = configureStore({
        reducer: {
            order: orderReducer,
            foodprep: foodprepReducer
        }
    })
    return store;
}

export const wrapper = createWrapper(makeStore);