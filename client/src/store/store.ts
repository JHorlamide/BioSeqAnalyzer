/* Libraries */
import storage from "redux-persist/lib/storage";
import { configureStore, Store, combineReducers, Reducer, AnyAction } from "@reduxjs/toolkit";
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

/* Application Modules */
import { unAuthenticatedMiddleware } from "./middleware/unAuthenticatedMiddleware";
import { RESET_STATE_ACTION_TYPE } from "./actions/resetStateAction";
import { AUTH_TOKEN } from "../constants/AuthConstant";

/* Slices */
import { authReducer, authSlice } from "./slices/authSlice";
import { proteinAnalyzerFilterReducer, proteinAnalyzerFilterSlice } from "./slices/proteinAnalyzerFilter";
import { DNASeqFilterReducer, DNASeqFilterSlice } from "./slices/DNASeqFilter"

/* API Services */
import { authApi, AUTH_API_REDUCER_KEY } from "../services/auth/authApi";
import { registerAPI, REGISTER_API_REDUCER_KEY } from "../services/auth/registerApi";
import { ProteinProjectAPI, PROTEIN_PROJECT_API_REDUCER_KEY } from "../services/proteinProject/proteinProjectAPI";
import { DNASeqProjectAPI, DNA_PROJECT_API_REDUCER_KEY } from "../services/DNASequence/DNASeqProjectAPI";
import { userAPI, USER_API } from "../services/user/userServiceAPI";

const reducers = {
  /* Slice */
  [authSlice.name]: authReducer,
  [AUTH_API_REDUCER_KEY]: authApi.reducer,
  [DNASeqFilterSlice.name]: DNASeqFilterReducer,
  [proteinAnalyzerFilterSlice.name]: proteinAnalyzerFilterReducer,

  /* Service */
  [REGISTER_API_REDUCER_KEY]: registerAPI.reducer,
  [PROTEIN_PROJECT_API_REDUCER_KEY]: ProteinProjectAPI.reducer,
  [DNA_PROJECT_API_REDUCER_KEY]: DNASeqProjectAPI.reducer,
  [USER_API]: userAPI.reducer,
}

const combinedReducer = combineReducers<typeof reducers>(reducers);

const persistConfig = {
  key: "root",
  storage: storage
};

export const rootReducer: Reducer = persistReducer(
  persistConfig,
  (state: RootState, action: AnyAction) => {
    if (action.type === RESET_STATE_ACTION_TYPE) {
      localStorage.removeItem(AUTH_TOKEN);
      state = {} as RootState;
    }

    return combinedReducer(state, action);
  });

/* Store Configuration */
export const store: Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat([
    unAuthenticatedMiddleware,
    userAPI.middleware,
    authApi.middleware,
    registerAPI.middleware,
    ProteinProjectAPI.middleware,
    DNASeqProjectAPI.middleware,
  ])
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
