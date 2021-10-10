import { createSlice } from '@reduxjs/toolkit';

interface RowState{
    elementLabel: string,
    elementStateName: string | undefined
}

const initialFormRowState : {[key: string] : RowState} = {};

const formRowSlicer = createSlice({
    name: 'formRow',
    initialState: initialFormRowState,
    reducers: {
        createElementLabel(state, action) {
            if(state[action.payload.droppableId] === undefined){
                state[action.payload.droppableId] = {elementLabel: action.payload.elementLabel, elementStateName: undefined};
            }
        },
        updateElementLabel(state, action) {
            state[action.payload.droppableId].elementLabel = action.payload.elementLabel;
        },
        removeAllLabelsForRow(state, action){
            Object.keys(state).filter(key => key.startsWith(`ph-${action.payload.index}`)).forEach(key => {
                state[key].elementLabel = '';
            })
        },
        createElementPropName(state, action){
            if(state[action.payload.droppableId] === undefined){
                state[action.payload.droppableId] = {elementLabel: '', elementStateName: action.payload.elementStateName};
            }else if(state[action.payload.droppableId] !== undefined && state[action.payload.droppableId].elementStateName === undefined){
                state[action.payload.droppableId].elementStateName = action.payload.elementStateName;
            }
        },
        updateElementStateName(state, action){
            state[action.payload.droppableId].elementStateName = action.payload.elementStateName;
        }
    },
});

export const formRowActions = formRowSlicer.actions;

export default formRowSlicer.reducer;