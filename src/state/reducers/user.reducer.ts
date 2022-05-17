import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Axios, removeItem, setItem } from 'src/services';

export type User = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    token: string;
};

type UserState = {
    user: User;
    isLoggedIn: boolean;
    isLoading: boolean;
    status: 'idle' | 'fulfilled' | 'loading' | 'failed';
    error: {
        status: number;
        message: string;
    };
};

const initialState: UserState = {
    user: <User>{},
    isLoggedIn: false,
    isLoading: false,
    status: 'idle',
    error: <UserState['error']>{},
};

export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }: { email: string; password: string }) => {
        try {
            const response = await Axios.post('/account/login', {
                user: { email, password },
                isMobile: true,
                version: 'v2',
            });
            await setItem('jwt_token', response.data.user.token);
            return response.data;
        } catch (err) {
            console.log(err.response.data);
        }
    }
);

export const loginMS = createAsyncThunk(
    'user/loginMS',
    async (accessToken: string) => {
        try {
            const response = await Axios.post('/account/loginms', {
                data: accessToken,
                isMobile: true,
                version: 'v2',
            });
            await setItem('jwt_token', response.data.user.token);
            return response.data;
        } catch (err) {
            console.log(err.response.data);
        }
    }
);

export const getCurrentUser = createAsyncThunk(
    'user/getCurrentUser',
    async () => {
        try {
            const response = await Axios.get('/get_current_user');

            return response.data;
        } catch (err) {
            console.log(err.response.data);
        }
    }
);

export const logout = createAsyncThunk('user/logout', async () => {
    await removeItem('jwt_token');
    return true;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                login.fulfilled,
                (state: UserState, action: PayloadAction<User>) => {
                    state.status = 'fulfilled';
                    state.user = action.payload;
                    state.isLoggedIn = true;
                }
            )
            .addCase(login.pending, (state: UserState) => {
                state.status = 'loading';
                state.error = <UserState['error']>{};
            })
            .addCase(login.rejected, (state: UserState) => {
                state.status = 'failed';
            })
            .addCase(
                loginMS.fulfilled,
                (state: UserState, action: PayloadAction<User>) => {
                    state.status = 'fulfilled';
                    state.user = action.payload;
                    state.isLoggedIn = true;
                }
            )
            .addCase(loginMS.pending, (state: UserState) => {
                state.status = 'loading';
                state.error = <UserState['error']>{};
            })
            .addCase(loginMS.rejected, (state: UserState) => {
                state.status = 'failed';
            })
            .addCase(getCurrentUser.pending, (state: UserState) => {
                state.status = 'loading';
                state.isLoading = true;
            })
            .addCase(
                getCurrentUser.fulfilled,
                (state: UserState, action: PayloadAction<User>) => {
                    state.status = 'fulfilled';
                    state.isLoading = false;
                    state.user = action.payload;
                    state.isLoggedIn = true;
                }
            )
            .addCase(logout.fulfilled, (state: UserState) => {
                state.user = <User>{};
                state.isLoggedIn = false;
            });
    },
});

export default userSlice.reducer;
