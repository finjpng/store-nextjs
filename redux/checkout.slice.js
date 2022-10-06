import { mergeOptions } from "@apollo/client";
import { createSlice } from "@reduxjs/toolkit";
import { result } from "lodash";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: [],
  reducers: {
    checkout: (state, action) => {
      const products = action.payload.prodData;
      const cartItems = action.payload.cart;
      // const result = cartItems.map((ci) => ({
      //   ...ci,
      //   ...products.find((p) => p.id === ci.id),
      // }));
      console.log("cart item if 1:", cartItems.id);
      const tempState = [];
      console.log("Products Console: ", products);
      console.log("RESULT: ", result);
      const deductQty = products.quantity - cartItems.quantity;
      if (cartItems.length > 1) {
        products.map((prod) => {
          cartItems.map((c) => {
            if (products.id === cartItems.id) {
              const deduct = prod.quantity - c.quantity;

              tempState.push({ ...c, quantity: deduct });
              return;
            }
          });
        });
      } else {
        // const itemExists = products.find((item) => item.id === cartItems.id);
        // if (itemExists) {
        products.map((prod) => {
          if (prod.id === cartItems.id) {
            const deduct = prod.quantity - cartItems.quantity;
            tempState.push({ ...prod, quantity: deduct });
          }
        });
      }

      const firstItem = tempState[0];

      console.log("from tempstate: ", tempState);
      const lastItem = tempState[tempState.length - 1];
      // var merged = firstItem, lastItem ;
      // objOutput[firstItem] = lastItem;
      state.push(firstItem, lastItem);
    },
  },
});
export const checkoutReducer = checkoutSlice.reducer;
export const { checkout } = checkoutSlice.actions;
// export default checkout;

// export const cartReducer = cartSlice.reducer;

// export const {
//   addToCart,
//   incrementQuantity,
//   decrementQuantity,
//   removeFromCart,
// } = cartSlice.actions;
