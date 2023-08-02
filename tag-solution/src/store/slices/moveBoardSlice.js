import { createSlice } from "@reduxjs/toolkit";

export const moveBoardSlice = createSlice({
    name: 'moveBoard',
    initialState: {
        moving: false,
        deltaX: 0,
        deltaY: 0,
        height: 1080,
        width: 1920
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
        },
        setHeight: (state, action) => {
            state.height = action.payload
        },
        setWidth: (state, action) => {
            state.width = action.payload
        }
    }
})

export const { moveBoard, startMoving, endMoving, setY, setX, setHeight, setWidth } = moveBoardSlice.actions

export default moveBoardSlice.reducer