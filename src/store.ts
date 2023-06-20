import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { persistStore, persistReducer } from "reduxjs-toolkit-persist";
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
import productsReducer from "./pages/Products/productsSlice";
import { watchProductsSaga } from "./pages/Products/productsSaga";
import { watchUserSaga } from "./features/auth/authSaga";
import cartReducer from "./features/cart/guestCartSlice";
import cartUserReducer from "./features/cart/userCartSlice";
import userReducer from "./features/auth/authSlice";
import { watchShoppingCart } from "./features/cart/cartSaga";
import headerReducer from "./components/headerReducer";

function* rootSaga() {
  yield all([watchUserSaga(), watchProductsSaga(), watchShoppingCart()]);
}

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedProductsReducer = persistReducer(persistConfig, productsReducer);
const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedUserCartReducer = persistReducer(persistConfig, cartUserReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    products: persistedProductsReducer,
    cart: persistedCartReducer,
    userCart: persistedUserCartReducer,
    header: headerReducer,
  },
  middleware: [sagaMiddleware],
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { persistor };
export default store;
