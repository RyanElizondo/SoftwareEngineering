import { configureStore, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import orderReducer from './features/order/orderSlice';

export function makeStore() {
    return configureStore({
        reducer: {order: orderReducer},
        devTools: true
    })
}

const store = makeStore();

export default store;
export const wrapper = createWrapper(makeStore);