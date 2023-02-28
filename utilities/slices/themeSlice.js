import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'light',
};

export const themeSlice = createSlice({
  name: 'themeState',
  initialState,
  reducers: {
    toggleLight: (state) => {
      state.value === 'light'
        ? (state.value = 'dark')
        : (state.value = 'light');
    },
    toggleByValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { toggleLight, toggleByValue } = themeSlice.actions;

export default themeSlice.reducer;
