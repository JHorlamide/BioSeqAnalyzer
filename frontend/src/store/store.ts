import { configureStore, combineReducers, Reducer, AnyAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
  persistReducer
} from "redux-persist";
import { proteinApi } from "./slices/apiSlice";
import { unAuthenticatedMiddleware } from "./middleware/unAuthenticatedMiddleware";
import { authReducer } from "./slices/authSlice";
import { projectReducer } from "./slices/projectSlice";
import { RESET_STATE_ACTION_TYPE } from "./actions/resetStateAction";
import storage from "redux-persist/lib/storage";
import { AUTH_TOKEN } from "../constants/AuthConstant";

const reducers = {
  ["auth"]: authReducer,
  ["project"]: projectReducer,
  [proteinApi.reducerPath]: proteinApi.reducer
}

const combinedReducer = combineReducers<typeof reducers>(reducers);

const persistConfig = {
  key: "root",
  storage: storage
};

export const rootReducer: Reducer = persistReducer(persistConfig, (state: RootState, action: AnyAction) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    localStorage.removeItem(AUTH_TOKEN);

    proteinApi.util.resetApiState();
    window.location.replace("/");

    state = {} as RootState;
  }

  return combinedReducer(state, action);
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat([
    unAuthenticatedMiddleware,
    proteinApi.middleware,
  ])
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;