import { createSlice } from "@reduxjs/toolkit";

export const fieldsOnBoardSlice = createSlice({
    name: 'aStar',
    initialState: {
        fields: [],
        size: 0,
        ready: false,
        highlight: false,
        highlightenElement: 'none'
    },
    reducers: {
        fieldsPush: (state, action) => {
            let temp = state.fields
            temp.push(action.payload)
            state.fields = temp
            state.size += 1
        },
        setFieldsOnBoardReady: (state) => {
            state.ready = true
        },
        highlightElement: (state, action) => {
            state.highlight = true
            state.highlightenElement = action.payload
        },
        disableHighlight: (state) => {
            state.highlight = false
        }
    }
})

export const { fieldsPush, setFieldsOnBoardReady, highlightElement, disableHighlight } = fieldsOnBoardSlice.actions

export default fieldsOnBoardSlice.reducer