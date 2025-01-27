import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Features/users';

const store = configureStore({
    reducer : {
        users : userReducer,
    },
});

export default store