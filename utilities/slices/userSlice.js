import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: {},
  shipping: {},
  paymentMethod: '',
};

export const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.info = action.payload;
    },
    logoutUser: (state) => {
      state.info = {};
      state.shipping = {};
      state.paymentMethod = '';
    },
    addShipping: (state, action) => {
      state.shipping = action.payload;
    },
    userPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const { setUserInfo, logoutUser, addShipping, userPaymentMethod } =
  userSlice.actions;

export default userSlice.reducer;
