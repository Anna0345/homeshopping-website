import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import { RegistrationData } from "../../types";
import { Cart } from "../../types";
interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  registration: boolean;
  carts: Cart | null;
  userCart: Cart[];
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  registration: false,
  carts: null,
  userCart: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.registration = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    registerUser: (state, _action: PayloadAction<RegistrationData>) => {
      state.registration = true;
    },

    login: (state) => {
      state.loading = true;
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  registerUser,
  setUser,
  setLoading,
  setError,
  logoutUser,
  login,
} = userSlice.actions;

export default userSlice.reducer;
