import { call, put, takeLatest } from "redux-saga/effects";
import { registerUser, loginUser, getUserProfile } from "./authApi";
import { setUser, setLoading, setError } from "./authSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { RegistrationData, LoginData, User } from "../../types";

function* registerUserSaga(
  action: PayloadAction<RegistrationData>
): Generator<unknown, void, User> {
  try {
    yield put(setLoading(true));
    const { username, email, password } = action.payload;
    yield call(registerUser, action.payload);
    yield put(
      setUser({
        username,
        email,
        password,
        id: null,
        role: "",
        createdAt: null,
        updatedAt: null,
        addresses: [],
        payments: [],
        shoppingCart: [],
        orders: [],
      })
    );
  } catch (error) {
    const errorMessage = "Invalid credentials";
    yield put(setError(errorMessage));
  }
}

function* loginUserSaga(
  action: PayloadAction<LoginData>
): Generator<unknown, void, { user: User }> {
  try {
    yield put(setLoading(true));
    const { user } = yield call(loginUser, action.payload);
    yield put(setUser(user));
  } catch (error) {
    const errorMessage = "An error occurred.";
    yield put(setError(errorMessage));
  }
}

function* getUserProfileSaga(): Generator<unknown, void, User> {
  try {
    yield put(setLoading(true));
    const user = yield call(getUserProfile);
    yield put(setUser(user));
  } catch (error: unknown) {
    const userProfile = "Error fetching the users profile";
    yield put(setError(userProfile));
  }
}

export function* watchUserSaga() {
  yield takeLatest("user/registerUser", registerUserSaga);
  yield takeLatest("user/loginUser", loginUserSaga);
  yield takeLatest("user/getUserProfile", getUserProfileSaga);
}
