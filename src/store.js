import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import orderReducer from './features/order/orderSlice';
import foodprepReducer from './features/foodprepOrders/foodprepOrdersSlice'

const makeStore = () => {
    return configureStore({
        reducer: {
            order: orderReducer,
            foodprep: foodprepReducer
        },
    })
}

//const store = makeStore();

//export default store;
export const storeWrapper = createWrapper(makeStore);