import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { cowReducer, userReducer } from './reducers';

const store = configureStore({
    reducer: {
        cow: cowReducer,
        user: userReducer,
        // test: testReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
