import { configureStore } from "@reduxjs/toolkit"
import moveBoardReducer from "./slices/moveBoardSlice"
import gameFieldReducer from "./slices/gameFieldSlice"
import aStarReducer from "./slices/aStarSlice"
import fieldsOnBoardReducer from "./slices/fieldsOnBoardSlice"
import neighborsSlice from "./slices/neighborsSlice"

export default configureStore({
    reducer: { 
        moveBoard: moveBoardReducer,
        gameField: gameFieldReducer,
        aStar: aStarReducer,
        fieldsOnBoard: fieldsOnBoardReducer,
        neighbors: neighborsSlice
    },
    devTools: process.env.NODE_ENV !== 'production'
})