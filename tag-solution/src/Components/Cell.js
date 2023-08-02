import { useDispatch } from 'react-redux'
import '../scss/cell.scss'
import { makeMove } from '../store/slices/gameFieldSlice'

const Cell = (props) => {
    let text =''
    if (props.number !== 0) {
        text = props.number + ''
    }
    const dispatch = useDispatch()
    return (
        <div className='Cell' onClick={(e) => {dispatch(makeMove(text))}}>
            <p>{text}</p>
        </div>
    )
}

export default Cell