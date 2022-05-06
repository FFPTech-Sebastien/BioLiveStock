import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
};

type UserState = {
    user: User;
    isLoggedIn: boolean;
};

const initialState: UserState = {
    user: <User>{},
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.user = <User>{};
            state.isLoggedIn = false;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
