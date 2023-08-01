import { createSlice } from "@reduxjs/toolkit";

export const moveBoardSlice = createSlice({
    name: 'moveBoard',
    initialState: {
        moving: false,
        deltaX: 0,
        deltaY: 0
    },
    reducers: {
        startMoving: (state) => {
            state.moving = true
        },
        endMoving: (state) => {
            state.moving = false
        },
        moveBoard: (state, action) => {
            state.deltaX += action.payload.deltaX
            state.deltaY += action.payload.deltaY
        },
        setY: (state, action) => {
            state.deltaY = action.payload
        },
        setX: (state, action) => {
            state.deltaX = action.payload
        }
    }
})

export const { moveBoard, startMoving, endMoving, setY, setX } = moveBoardSlice.actions

export default moveBoardSlice.reducer