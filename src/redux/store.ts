import { configureStore } from "@reduxjs/toolkit";
import { baseAPI } from "./features/baseApi";
import userReducer from "../redux/features/user/userSlice";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { Persistor } from "redux-persist/es/types";

// persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// persist user reducer for storing data even after reload the page
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Store configurations
export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    [baseAPI.reducerPath]: baseAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseAPI.middleware),
});

export const persistor: Persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
