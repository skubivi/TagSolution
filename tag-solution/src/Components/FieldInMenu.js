import { useDispatch, useSelector } from 'react-redux'
import '../scss/fieldInMenu.scss'
import { useRef } from 'react'
import { setTarget } from '../store/slices/moveBoardSlice'
import { clear } from '../store/slices/neighborsSlice'
import { disableHighlight, highlightElement } from '../store/slices/fieldsOnBoardSlice'

const FieldInMenu = (props) => {
    const numbers = props.field.field

    const dispatch = useDispatch()

    const windowWidth = useRef(window.innerWidth)
    const windowHeight = useRef(window.innerHeight)

    const width = useSelector((state) => state.moveBoard.width)
    const height = useSelector((state) => state.moveBoard.height)

    const getCenterWidth = () => {
        return width / 2 - (windowWidth.current / 2)
    }
    const getCenterHeight = () => {
        return height / 2 - (windowHeight.current / 2)
    }

    const disable = () => {
        dispatch(disableHighlight())
    }

    const clickHandler = (e) => {
        const targetX = Math.floor(-(getCenterWidth() + props.field.x * 360))
        const targetY = Math.floor(-(getCenterHeight() + props.field.y * 360))
        const target = {
            targetX, targetY
        }
        dispatch(setTarget(target))
        dispatch(clear())
        disable()
    }

    const highlightPoint = () => {
        dispatch(highlightElement([props.field.x, props.field.y]))
    }

    return (
        <div className='FieldWrapper' onClick={clickHandler} onMouseEnter={highlightPoint} onMouseLeave={disable}>
            <div className="Field4">
                <div className="Line">
                    <div className="Field">{numbers[0][0] === 0 ? '' : numbers[0][0]}</div>
                    <div className="Field">{numbers[0][1] === 0 ? '' : numbers[0][1]}</div>
                    <div className="Field">{numbers[0][2] === 0 ? '' : numbers[0][2]}</div>
                    <div className="Field">{numbers[0][3] === 0 ? '' : numbers[0][3]}</div>
                </div>
                <div className="Line">
                    <div className="Field">{numbers[1][0] === 0 ? '' : numbers[1][0]}</div>
                    <div className="Field">{numbers[1][1] === 0 ? '' : numbers[1][1]}</div>
                    <div className="Field">{numbers[1][2] === 0 ? '' : numbers[1][2]}</div>
                    <div className="Field">{numbers[1][3] === 0 ? '' : numbers[1][3]}</div>
                </div>
                <div className="Line">
                    <div className="Field">{numbers[2][0] === 0 ? '' : numbers[2][0]}</div>
                    <div className="Field">{numbers[2][1] === 0 ? '' : numbers[2][1]}</div>
                    <div className="Field">{numbers[2][2] === 0 ? '' : numbers[2][2]}</div>
                    <div className="Field">{numbers[2][3] === 0 ? '' : numbers[2][3]}</div>
                </div> 
                <div className="Line">
                    <div className="Field">{numbers[3][0] === 0 ? '' : numbers[3][0]}</div>
                    <div className="Field">{numbers[3][1] === 0 ? '' : numbers[3][1]}</div>
                    <div className="Field">{numbers[3][2] === 0 ? '' : numbers[3][2]}</div>
                    <div className="Field">{numbers[3][3] === 0 ? '' : numbers[3][3]}</div>
                </div>
            </div>
        </div>
    )
}

export default FieldInMenu