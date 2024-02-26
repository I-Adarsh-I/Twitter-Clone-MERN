import { configureStore } from "@reduxjs/toolkit";
import persistConfig from "./persistConfig";
import rootReducer from './root_reducer/RootReducers'
import {persistReducer, persistStore} from 'redux-persist'

const persitedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persitedReducer
})

export const persistor = persistStore(store);
export default store;