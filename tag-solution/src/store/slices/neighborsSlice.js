import { createSlice } from "@reduxjs/toolkit";

export const neighborsSlice = createSlice({
    name: 'neighbors',
    initialState: {
        show: false,
        currentId: 0,
        neighbors: [],
    },
    reducers: {
        setNeighbors: (state, action) => {
            state.show = true
            state.currentId = action.payload.id
            state.neighbors = action.payload.neighbors
        },
        clear: (state) => {
            state.neighbors = []
            state.show = false
        }
    }
})

export const { setNeighbors, clear } = neighborsSlice.actions

export default neighborsSlice.reducer