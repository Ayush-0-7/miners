import { configureStore } from "@reduxjs/toolkit";
import MinersReducer from '../features/miners/MinerSlice';
export const Store = configureStore({
    reducer:MinersReducer,
});