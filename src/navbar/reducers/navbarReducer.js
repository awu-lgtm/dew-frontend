import { createSlice } from '@reduxjs/toolkit';

const navbarSlice = createSlice({
  name: 'navbar',
  initialState: true,
  reducers: {
    setShow() {
      return true;
    },
    setHide() {
      return false;
    },
    toggleShow(state) {
      return !state;
    },
  },
});

export const { setShow, setHide, toggleShow } = navbarSlice.actions;
export default navbarSlice.reducer;
