import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
import newsReducer from '../features/news/newsSlice';


const store = configureStore({
    reducer: {
        news: newsReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;