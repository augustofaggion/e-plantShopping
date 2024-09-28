import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0, // Initialize totalQuantity as 0
  },
  reducers: {
    addItem: (state, action) => {
      const {name, image, cost} = action.payload;
      const exiistingItem = state.items.find((item) => item.name === name);
      if (exiistingItem) {
        exiistingItem.quatity++;
      } else {
        state.items.push({name, image, cost, quantity: 1});
      }
      state.totalQuantity += 1;
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity; // Decrease total quantity
        state.items = state.items.filter(item => item.id !== action.payload.id);
      }
    },
    updateQuantity: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity; // Decrease total quantity
        state.items = state.items.filter(item => item.id !== action.payload.id);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions; // this export the reducer functions
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export default CartSlice.reducer;
