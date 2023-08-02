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
            x: 0,
            y: 0,
            g: 0,
            h: 0,
            f: 0,
            parent: 'none'
        },
        needToCheck: [],
        checked: [],
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        ended: false
    },
    reducers: {
        setStartPoint: (state, action) => {
            state.startPoint = action.payload
        },
        end: (state) => {
            state.ended = true
        },
        needToCheckPush: (state, action) => {
            let temp = state.needToCheck
            temp.push(action.payload)
            state.needToCheck = temp

            if (action.payload.x < -state.left) state.left = -action.payload.x
            if (action.payload.x > state.right) state.right = action.payload.x
            if (action.payload.y < -state.bottom) state.bottom = -action.payload.y
            if (action.payload.y > state.top) state.top = action.payload.y
        },
        checkedPush: (state, action) => {
            let temp = state.checked
            temp.push(action.payload)
            state.checked = temp
        },
        needToCheckRemove: (state, action) => {
            let temp = state.needToCheck
            state.needToCheck = temp.filter((point) => {return !(point.x === action.payload.x && point.y === action.payload.y)})
        }
    }
})

export const { setStartPoint, end, needToCheckPush, checkedPush, needToCheckRemove } = aStarSlice.actions

export default aStarSlice.reducer