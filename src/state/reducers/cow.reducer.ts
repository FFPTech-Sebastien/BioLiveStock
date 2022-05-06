import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Cow = {
    image: string[];
    id: string;
    rfid: string;
    age: number;
    weight: number;
};

type CowState = {
    cows: Cow[];
};

const initialState: CowState = {
    cows: [],
};

const cowSlice = createSlice({
    name: 'cow',
    initialState,
    reducers: {
        addCow: (state, action: PayloadAction<Cow>) => {
            state.cows.push(action.payload);
        },
    },
});

export const { addCow } = cowSlice.actions;
export default cowSlice.reducer;
