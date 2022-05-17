import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import globalConfig from 'src/config/global.config';

const { BASE_URL } = globalConfig;

export type Cow = {
    images: string[];
    id: number;
    rfid: number;
    age: number;
    weight: number;
    status: 'healthy' | 'sick' | 'dead';
};

type CowState = {
    cows: Cow[];
    status: 'idle' | 'fulfilled' | 'loading' | 'failed';
};

const initialState: CowState = {
    cows: [],
    status: 'idle',
};

export const fetchCows = createAsyncThunk('cows/fetchCows', async () => {
    // await wait(2000);
    const response = await fetch('http://192.168.0.134:4000');
    const data = await response.json();
    return [...data];
});

const cowSlice = createSlice({
    name: 'cows',
    initialState,
    reducers: {
        addCow: (state: CowState, action: PayloadAction<Cow>) => {
            state.cows.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCows.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(
                fetchCows.fulfilled,
                (state, action: PayloadAction<Cow[]>) => {
                    state.status = 'fulfilled';
                    state.cows = action.payload;
                }
            )
            .addCase(fetchCows.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

export const { addCow } = cowSlice.actions;
export default cowSlice.reducer;
