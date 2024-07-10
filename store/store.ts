import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore, combineReducers } from "@reduxjs/toolkit";
import { usersApi } from "./users/usersApi";
import authReducer from './authSlice';
import userSelectionReducer from './userSelectionSlice';

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
//const rootReducer = combineSlices(usersApi);
const rootReducer = combineReducers({
  auth: authReducer,
  userSelection: userSelectionReducer,
  [usersApi.reducerPath]: usersApi.reducer,
});

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(usersApi.middleware);
    },
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;