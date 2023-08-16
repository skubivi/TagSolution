import { createSlice } from "@reduxjs/toolkit";

export const aStarSlice = createSlice({
    name: 'aStar',
    initialState: {
        startPoint: {
            field: [
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 0]
            ],
            id: 0,
            g: 0,
            h: 0,
            f: 0,
            parent: 'none'
        },
        size: 0,
        needToCheck: [],
        checked: [],
        ended: false
    },
    reducers: {
        setStartPoint: (state, action) => {
            state.startPoint = action.payload
        },
        end: (state) => {
            state.ended = true
            state.needToCheck = []
        },
        needToCheckPush: (state, action) => {
            let temp = state.needToCheck
            temp.push(action.payload)
            state.needToCheck = temp
        },
        checkedPush: (state, action) => {
            let temp = state.checked
            temp.push(action.payload)
            state.checked = temp
            state.size = state.size + 1
        },
        needToCheckRemove: (state, action) => {
            let temp = state.needToCheck
            state.needToCheck = temp.filter((point) => {return !(point.id === action.payload.id)})
        },
        checkedClear: (state) => {
            state.checked = []
        }
    }
})

export const { setStartPoint, end, needToCheckPush, checkedPush, needToCheckRemove, checkedClear } = aStarSlice.actions

export default aStarSlice.reducer