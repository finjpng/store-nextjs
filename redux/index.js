import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-clice.js";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});
export default store;
