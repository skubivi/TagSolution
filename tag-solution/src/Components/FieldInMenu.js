import { useDispatch, useSelector } from 'react-redux'
import '../scss/fieldInMenu.scss'
import { useRef } from 'react'
import { moveX, moveY, setTarget } from '../store/slices/moveBoardSlice'
import { clear, setNeighbors } from '../store/slices/neighborsSlice'

const FieldInMenu = (props) => {
    const numbers = props.field.field

    const dispatch = useDispatch()

    const windowWidth = useRef(window.innerWidth)
    const windowHeight = useRef(window.innerHeight)

    const width = useSelector((state) => state.moveBoard.width)
    const height = useSelector((state) => state.moveBoard.height)

    const allFields = useSelector((state) => state.fieldsOnBoard.fields)
    const allFieldsSize = useSelector((state) => state.fieldsOnBoard.size)

    const getCenterWidth = () => {
        return width / 2 - (windowWidth.current / 2)
    }
    const getCenterHeight = () => {
        return height / 2 - (windowHeight.current / 2)
    }

    const clickHandler = (e) => {
        const targetX = Math.floor(-(getCenterWidth() + props.field.x * 360))
        const targetY = Math.floor(-(getCenterHeight() + props.field.y * 360))
        const target = {
            targetX, targetY
        }
        dispatch(setTarget(target))
        dispatch(clear())
    }

    return (
        <div className='FieldWrapper' onClick={clickHandler}>
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