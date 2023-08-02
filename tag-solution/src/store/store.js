import { configureStore } from "@reduxjs/toolkit"
import moveBoardReducer from "./slices/moveBoardSlice"
import gameFieldReducer from "./slices/gameFieldSlice"
import aStarReducer from "./slices/aStarSlice"

export default configureStore({
    reducer: { 
        moveBoard: moveBoardReducer,
        gameField: gameFieldReducer,
        aStar: aStarReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
})