import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    "items": []
}

const addItemReducer = (item) => {
    
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
    }
})