import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  devTools: import.meta.env.MODE !== 'production', // Enables DevTools only in development mode

});

export default store;
