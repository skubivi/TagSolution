import { createSlice } from "@reduxjs/toolkit";

export const gameFieldSlice = createSlice({
    name: 'gameField',
    initialState: {
        field: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]],
        ready: false
    },
    reducers: {
        makeMove: (state, action) => {
            let x
            let y
            let x1
            let y1
            let payload = action.payload === '' ? '0' : action.payload
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (state.field[i][j] + '' === payload) {
                        x = i
                        y = j
                    }
                    if (state.field[i][j] === 0) {
                        x1 = i
                        y1 = j
                    }
                }
            }
            if ((((x1 - x === 1) || (x1 - x === -1)) && (y === y1)) || ( ((y1 - y === 1) || (y1 - y === -1)) && (x === x1))) {
                const temp = state.field[x][y]
                state.field[x][y] = state.field[x1][y1]
                state.field[x1][y1] = temp
            }
        },
        nextWindow: (state) => {
            state.ready = true
        }
    }
})

export const { makeMove, nextWindow } = gameFieldSlice.actions

export default gameFieldSlice.reducer