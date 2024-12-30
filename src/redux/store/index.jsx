// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";
import rootSaga from "../saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default is localStorage

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Setup persist configuration
const persistConfig = {
  key: "root", // The key to store the persisted state
  storage, // Use localStorage as the storage
  whitelist: ['GetUserDetail'], // Persist only the 'GetUserDetail' reducer
};

// Create a persisted reducer using the root reducer and the persist config
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }).concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Create a persistor to persist the store
const persistor = persistStore(store);

// Export store and persistor as named exports
export { store, persistor };
