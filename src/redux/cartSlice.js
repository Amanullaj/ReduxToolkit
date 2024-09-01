// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [], // Initialize as an empty array
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const tempData = state.data;
      let isItemExist = false;
      tempData.forEach(item => {
        if (item.id === action.payload.id) {
          isItemExist = true;
          item.qty += 1;
        }
      });
      if (!isItemExist) {
        tempData.push(action.payload);
      }
      state.data = tempData;
    },
    reduceItemFromCart(state, action) {
      const tempData = state.data;
      tempData.forEach(item => {
        if (item.id === action.payload.id && item.qty > 1) {
          item.qty -= 1;
        }
      });
      state.data = tempData;
    },
    removeItemFromCart(state, action) {
      const tempData = state.data.filter(item => item.id !== action.payload.id);
      state.data = tempData;
    }
  }
});

export const { addItemToCart, reduceItemFromCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
