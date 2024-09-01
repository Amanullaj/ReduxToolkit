// src/redux/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';



const productSlice = createSlice({
  name: 'products',
  initialState: {data: []},
  reducers: {
    addProducts: (state, action) => {
      state.data = action.payload
    },
  },
});

export const { addProducts } = productSlice.actions;

export default productSlice.reducer;
