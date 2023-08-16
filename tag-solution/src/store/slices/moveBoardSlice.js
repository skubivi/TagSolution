import { createSlice } from "@reduxjs/toolkit";

export const moveBoardSlice = createSlice({
    name: 'moveBoard',
    initialState: {
        moving: false,
        deltaX: 0,
        deltaY: 0,
        height: 1080,
        width: 1920,
        targetX: 0,
        targetY: 0,
        movingToTarget: false,
        intevalId: 'none'
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
        moveX: (state, action) => {
            state.deltaX += action.payload
        },
        moveY: (state, action) => {
            state.deltaY += action.payload
        },
        setTarget: (state, action) => {
            state.movingToTarget = true
            state.targetX = action.payload.targetX
            state.targetY = action.payload.targetY
        },
        removeTarget: (state) => {
            state.movingToTarget = false
        },
        setIntevalId: (state, action) => {
            state.intevalId = action.payload
        },
        removeIntervalId: (state) => {
            state.intevalId = 'none'
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

export const { moveBoard, startMoving, endMoving, setY, setX, setHeight, setWidth, moveX, moveY, setTarget, removeTarget, setIntevalId, removeIntervalId } = moveBoardSlice.actions

export default moveBoardSlice.reducer