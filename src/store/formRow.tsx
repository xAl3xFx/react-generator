import { createSlice } from '@reduxjs/toolkit';

const initialFormRowState : {[key: string] : string} = {};

const formRowSlicer = createSlice({
    name: 'formRow',
    initialState: initialFormRowState,
    reducers: {
        createColumnName(state, action) {
            if(state[action.payload.droppableId] === undefined)
                state[action.payload.droppableId] = action.payload.name;
        },
        updateColumnName(state, action) {
            state[action.payload.droppableId] = action.payload.name;
        },
    },
});

export const formRowActions = formRowSlicer.actions;

export default formRowSlicer.reducer;