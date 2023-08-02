import { configureStore } from "@reduxjs/toolkit"
import moveBoardReducer from "./slices/moveBoardSlice"
import gameFieldReducer from "./slices/gameFieldSlice"

export default configureStore({
    reducer: { 
        moveBoard: moveBoardReducer,
        gameField: gameFieldReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
})