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
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        console.log(`Incrementing quantity for: ${name}`);
        existingItem.quantity++;
        state.totalQuantity += 1;
      } else {
        console.log(`Adding new item: ${name}`);
        state.items.push({name, image, cost, quantity: 1});
        state.totalQuantity += 1;
      }

    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem && existingItem.quantity > 1) {
        state.totalQuantity -= existingItem.quantity; // Decrease total quantity
        state.items = state.items.filter(item => item.name !== action.payload.name);
      } else if (existingItem && existingItem.quantity === 1) {
        state.totalQuantity -= 1; // Decrease total quantity
        state.items = state.items.filter(item => item.name !== action.payload.name);
      } else {
        console.log(`Item not found: ${action.payload.name}`);
      }
    },
    updateQuantity: (state, action) => {
      const { quantity } = action.payload;
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity = quantity;

      }
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions; // this export the reducer functions
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export default CartSlice.reducer;
