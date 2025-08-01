import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistedAuthConfig = {
    key: "auth",
    storage,
};

const persistedAuthReducer = persistReducer(persistedAuthConfig, authReducer);

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
    },
});

export const persistor = persistStore(store);
export default store;
