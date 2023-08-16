import { useDispatch, useSelector } from 'react-redux'
import '../scss/board.scss'
import { endMoving, moveBoard, setY, setX, startMoving, setWidth, setHeight, removeIntervalId, setIntevalId, removeTarget, moveX, moveY } from '../store/slices/moveBoardSlice'
import { useEffect, useRef, useState } from 'react'
import disableScroll from 'disable-scroll'
import FieldOnBoard from './FieldOnBoard'
import { fieldsPush } from '../store/slices/fieldsOnBoardSlice'
import { checkedClear } from '../store/slices/aStarSlice'
import { clear } from '../store/slices/neighborsSlice'

const Board = () => {
    const dispatch = useDispatch()

    const moving = useSelector((state) => state.moveBoard.moving)
    const deltaX = useSelector((state) => state.moveBoard.deltaX)
    const deltaY = useSelector((state) => state.moveBoard.deltaY)
    const allField = useSelector((state) => state.aStar.checked)
    const sizeOfField = useSelector((state) => state.aStar.size)

    const windowWidth = useRef(window.innerWidth)
    const windowHeight = useRef(window.innerHeight)

    const fieldsOnBoard = useSelector((state) => state.fieldsOnBoard.fields)
    const fieldsOnBoardSize = useSelector((state) => state.fieldsOnBoard.size)

    const getI = (n) => {
        const D = Math.sqrt(1 + 2 * n)
        const i = (-1 + D) / 2
        return Math.ceil(i)
    }

    const left = deltaX
    const top = deltaY
    const size = (getI(sizeOfField - 1) * 2 + 1) * 360
    const height = size + windowHeight.current
    const width = size + windowWidth.current

    const getCenterWidth = () => {
        return width / 2 - 120
    }
    const getCenterHeight = () => {
        return height / 2 - 120
    }
    const getStyle = (x, y) => {
        return {
            left: getCenterWidth() + x * 360 + 'px',
            top: getCenterHeight() + y * 360 + 'px'
        }
    }
    
    const setFields = () => {
        let k = 1
        let i = 1
        dispatch(fieldsPush({...allField[0], x: 0, y: 0}))
        while (k < sizeOfField) {
            const max = i * 4
            let j = 0
            let y = -(max / 4)
            let x = 0
            let risingX = true
            let risingY = true
            while (j < max) {
                let temp = {...allField[k], x, y}
                dispatch(fieldsPush(temp))
                if (y === -(max) / 4) risingY = true
                if (y === max / 4) risingY = false
                if (x === -(max) / 4) risingX = true
                if (x === max / 4) risingX = false
                if (risingX) x++
                else x--
                if (risingY) y++
                else y--
                k++
                j++
                if (k === sizeOfField) break
            }
            i++
        }
        dispatch(checkedClear())
    }

    let styleObj = {
        position: 'absolute',
        left: left + 'px',
        top: top + 'px',
        width: width + 'px',
        height: height + 'px',
        display: 'flex',
        flexDirection: 'column'
    }

    useEffect(() => {
        setFields()
        dispatch(setWidth(width))
        dispatch(setHeight(height))
        dispatch(setY((-height + windowHeight.current) / 2))
        dispatch(setX((-width + windowWidth.current) / 2))
    }, []);

    const fields = []
    for (let i = 0; i < fieldsOnBoardSize; i++) {
        const tempStyle = getStyle(fieldsOnBoard[i].x, fieldsOnBoard[i].y)
        fields.push(<FieldOnBoard key={i} field={fieldsOnBoard[i]} style={tempStyle}/>)
    }

    const movingToTarget = useSelector((state) => state.moveBoard.movingToTarget)
    const intevalId = useSelector((state) => state.moveBoard.intevalId)
    const targetX = useSelector((state) => state.moveBoard.targetX)
    const targetY = useSelector((state) => state.moveBoard.targetY)

    if (movingToTarget) {
        if (intevalId === 'none') {
            let currentX = deltaX
            let currentY = deltaY
            const timer = setInterval(() => {
                if (Math.abs(targetX - currentX) < 1 && Math.abs(targetY - currentY) < 1) dispatch(removeTarget())
                if (currentX < targetX && Math.abs(targetX - currentX) >= 1) {
                    dispatch(moveX(1))
                    currentX += 1
                }
                if (currentX > targetX && Math.abs(targetX - currentX) >= 1) {
                    dispatch(moveX(-1))
                    currentX -= 1
                }
                if (currentY < targetY && Math.abs(targetY - currentY) >= 1) {
                    dispatch(moveY(1))
                    currentY += 1
                }
                if (currentY > targetY && Math.abs(targetY - currentY) >= 1) {
                    dispatch(moveY(-1))
                    currentY -= 1
                }
                console.log(Math.abs(currentY - targetY));
            }, 1)
            dispatch(setIntevalId(timer))
        }
    }

    if (!movingToTarget && intevalId !== 'none') {
        clearInterval(intevalId)
        dispatch(removeIntervalId())
    }

    const onMouseDown = (e) => {
        if (e.button === 0 && !movingToTarget) {
            dispatch(startMoving())
            dispatch(clear())
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

    return (
        <div className='Board' 
            onMouseDown={onMouseDown} 
            onMouseMove={onMouseMove} 
            onMouseUp={onMouseUp}
            onMouseEnter={(e) => {disableScroll.on()}}
            onMouseLeave={(e) => {disableScroll.off()}}
            style={styleObj}
        >
            {fields}
        </div>
    )
}

export default Board