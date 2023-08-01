import { configureStore } from "@reduxjs/toolkit"
import moveBoardReducer from "./slices/moveBoardSlice"

export default configureStore({
    reducer: { 
        moveBoard: moveBoardReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
})