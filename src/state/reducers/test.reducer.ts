import {
    Action,
    AnyAction,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

type TestState = {
    value: number;
};

const initialState: TestState = {
    value: 0,
};

interface RejectedAction extends Action {
    error: Error;
}

const isRejectedAction = (action: AnyAction): action is RejectedAction => {
    return action.type.endsWith('ment');
};

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => action.type.includes('i'),
                (state, action) => {
                    console.log("I'm a matcher!", state);
                }
            )
            .addMatcher(isRejectedAction, (state, action) => {
                console.log(action.type);
            });
    },
});

export const { increment } = testSlice.actions;
export default testSlice.reducer;
