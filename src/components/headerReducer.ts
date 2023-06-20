import { createSlice } from "@reduxjs/toolkit";

interface MenuState {
  active: boolean;
}

const initialState: MenuState = {
  active: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openMenu: (state) => {
      state.active = true;
    },
    closeMenu: (state) => {
      state.active = false;
    },
  },
});

export const { openMenu, closeMenu } = menuSlice.actions;

export default menuSlice.reducer;
