import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showCart: false,
    changed: false,
  },
  reducers: {
    replaceData(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.itemsList = action.payload.itemsList;
    },
    addToCart(state, action) {
      state.changed = true;
      const newItem = action.payload;
      // to check if item is already available
      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.productName,
        });
        state.totalQuantity++;
      }
    },
    removeFromCart(state, action) {
      state.changed = true;
      const id = action.payload;

      const existingItem = state.itemsList.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.itemsList = state.itemsList.filter((item) => item.id !== id);
        state.totalQuantity--;
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});
export const cartActions = cartSlice.actions;

export default cartSlice;
//   name: "cart",
//   initialState: [],
//   reducers: {
//     addToCart: (state, action) => {
//       const itemExists = state.find((item) => item.id === action.payload.id);
//       if (itemExists) {
//         itemExists.quantity++;
//       } else {
//         state.push({ ...action.payload, quantity: 1 });
//       }
//     },
//     incrementQuantity: (state, action) => {
//       const item = state.find((item) => item.id === action.payload);
//       item.quantity++;
//     },
//     decrementQuantity: (state, action) => {
//       const item = state.find((item) => item.id === action.payload);
//       if (item.quantity === 1) {
//         const index = state.findIndex((item) => item.id === action.payload);
//         state.splice(index, 1);
//       } else {
//         item.quantity--;
//       }
//     },
//     removeFromCart: (state, action) => {
//       const index = state.findIndex((item) => item.id === action.payload);
//       state.splice(index, 1);
//     },
//   },
// });

// export const cartReducer = cartSlice.reducer;

// export const {
//   addToCart,
//   incrementQuantity,
//   decrementQuantity,
//   removeFromCart,
// } = cartSlice.actions;
