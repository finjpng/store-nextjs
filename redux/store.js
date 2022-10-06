import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart.slice";
import { checkoutReducer } from "./checkout.slice";

const reducer = {
  cart: cartReducer,
  checkout: checkoutReducer,
};

const store = configureStore({
  reducer,
});

export default store;
