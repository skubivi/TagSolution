import { useDispatch, useSelector } from 'react-redux'
import '../scss/board.scss'
import CellLine from './CellLine'
import { endMoving, moveBoard, setY, setX, startMoving, setWidth, setHeight } from '../store/slices/moveBoardSlice'
import { useEffect, useRef } from 'react'
import disableScroll from 'disable-scroll'

const Board = () => {
    const moving = useSelector((state) => state.moveBoard.moving)
    const deltaX = useSelector((state) => state.moveBoard.deltaX)
    const deltaY = useSelector((state) => state.moveBoard.deltaY)

    const windowWidth = useRef(window.innerWidth)
    const windowHeight = useRef(window.innerHeight)
    
    const left = deltaX
    const top = deltaY
    const height = windowHeight.current * 2
    const width = windowWidth.current * 2

    const dispatch = useDispatch()

    const xd = useEffect(() => {
        dispatch(setWidth(width))
        dispatch(setHeight(height))
        dispatch(setY((-height + windowHeight.current) / 2))
        dispatch(setX((-width + windowWidth.current) / 2))
    }, []);

    const onMouseDown = (e) => {
        if (e.button === 0) {
            dispatch(startMoving())
        }
    }
    const onMouseMove = (e) => {
        if (moving) {
            let deltaX = e.nativeEvent.movementX
            let deltaY = e.nativeEvent.movementY
            if (deltaX + left > 0) deltaX = -left
            if (deltaX + left < -width + windowWidth.current) deltaX = -(width - windowWidth.current + left)
            if (deltaY + top > 0) deltaY = -top
            if (deltaY + top < -height + windowHeight.current) deltaY = -(height - windowHeight.current + top)
            const delta = {
                deltaX,
                deltaY
            }
            dispatch(moveBoard(delta))
        }
    }
    const onMouseUp = (e) => {
        if (e.button === 0) {
            dispatch(endMoving())
        }
    }

    const styleObj = {
        position: 'absolute',
        left: left + 'px',
        top: top + 'px',
        width: width + 'px',
        height: height + 'px',
        display: 'flex',
        flexDirection: 'column'
    }

    return (
        <div className='Board' 
            onMouseDown={onMouseDown} 
            onMouseMove={onMouseMove} 
            onMouseUp={onMouseUp}
            onMouseEnter={(e) => {disableScroll.on()}}
            onMouseLeave={(e) => {disableScroll.off()}}
            style={styleObj}
        >
            
        </div>
    )
}

export default Board