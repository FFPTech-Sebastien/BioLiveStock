import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageURISource } from 'react-native';
import globalConfig from 'src/config/global.config';

const { BASE_URL } = globalConfig;

export type CowStatus = 'healthy' | 'sick' | 'dead';
export type CowSpecies = 'Black Angus';

export type Cow = {
    // images: string[];
    images: ImageURISource[];
    id: number;
    rfid: number;
    age: number;
    weight: number;
    status: CowStatus;
    species: CowSpecies;
    stats: number[];
};

type CowState = {
    cows: Cow[];
    status: 'idle' | 'fulfilled' | 'loading' | 'failed';
};

const PATH = '../../../assets/cows';

const cows: Cow[] = [
    {
        id: 1,
        rfid: 1,
        images: [
            require(`${PATH}/shutterstock_436527964.jpg`),
            require(`${PATH}/shutterstock_1477556039.jpg`),
            require(`${PATH}/shutterstock_1918853753.jpg`),
        ],
        age: 0.1,
        weight: 200,
        status: 'healthy',
        species: 'Black Angus',
        stats: [8.5, 6.5, 4.5, 4.5],
    },
    {
        id: 2,
        rfid: 2,
        images: [
            require(`${PATH}/shutterstock_509158528.jpg`),
            require(`${PATH}/shutterstock_511830751.jpg`),
            require(`${PATH}/shutterstock_1290360847 (1).jpg`),
        ],
        age: 0.2,
        weight: 120,
        status: 'dead',
        species: 'Black Angus',
        stats: [8.5, 6.5, 4.5, 4.5],
    },
    {
        id: 3,
        rfid: 3,
        images: [
            require(`${PATH}/shutterstock_517843021.jpg`),
            require(`${PATH}/shutterstock_1097817410.jpg`),
            require(`${PATH}/shutterstock_1097817422.jpg`),
        ],
        age: 0.5,
        weight: 300,
        status: 'sick',
        species: 'Black Angus',
        stats: [8.5, 6.5, 4.5, 4.5],
    },
    {
        id: 4,
        rfid: 4,
        images: [
            require(`${PATH}/shutterstock_1205106649.jpg`),
            require(`${PATH}/shutterstock_1205112730.jpg`),
            require(`${PATH}/shutterstock_1524389645.jpg`),
        ],
        age: 0.6,
        weight: 400,
        status: 'healthy',
        species: 'Black Angus',
        stats: [8.5, 6.5, 4.5, 4.5],
    },
    {
        id: 5,
        rfid: 5,
        images: [
            require(`${PATH}/shutterstock_1954611433.jpg`),
            require(`${PATH}/shutterstock_1955077906.jpg`),
        ],
        age: 2,
        weight: 500,
        status: 'healthy',
        species: 'Black Angus',
        stats: [8.5, 6.5, 4.5, 4.5],
    },
];

const initialState: CowState = {
    cows,
    status: 'fulfilled',
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
