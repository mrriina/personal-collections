import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './reducers/themeReducer';

export default configureStore({
    reducer: {
        theme: themeReducer,
    },
})