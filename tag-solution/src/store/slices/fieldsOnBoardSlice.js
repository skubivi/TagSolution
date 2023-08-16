import { createSlice } from "@reduxjs/toolkit";

export const fieldsOnBoardSlice = createSlice({
    name: 'aStar',
    initialState: {
        fields: [],
        size: 0
    },
    reducers: {
        fieldsPush: (state, action) => {
            let temp = state.fields
            temp.push(action.payload)
            state.fields = temp
            state.size += 1
        },
    }
})

export const { fieldsPush } = fieldsOnBoardSlice.actions

export default fieldsOnBoardSlice.reducer