import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productAdded: [],
  totalCart: 0,
};

export const shopSlice = createSlice({
  name: 'Shopstate',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const indexItem = state.productAdded.findIndex(
        (item) => item.product._id === action.payload._id
      );
      if (indexItem !== -1) {
        state.productAdded[indexItem].count++;
      } else {
        state.productAdded.push({ product: action.payload, count: 1 });
      }
      state.totalCart++;
    },
    changeCartCount: (state, action) => {
      const pervValue = state.productAdded[action.payload.index].count;
      state.productAdded[action.payload.index].count = action.payload.value;
      state.totalCart += action.payload.value - pervValue;
    },
    removeFromCart: (state, action) => {
      const pervValue = state.productAdded[action.payload.index].count;
      state.productAdded.splice(action.payload.index, 1);
      state.totalCart -= pervValue;
    },
    emptyCart: (state) => {
      state.productAdded = [];
      state.totalCart = 0;
    },
  },
});

export const { addToCart, changeCartCount, removeFromCart, emptyCart } =
  shopSlice.actions;

export default shopSlice.reducer;
