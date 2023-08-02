import { useSelector } from 'react-redux'
import '../scss/gameField.scss'
import CellLine from './CellLine'

const GameField = () => {
    let numbers = useSelector((state) => state.gameField.field)
    let lines = []
    for (let i = 0; i <  4; i++) {
        lines.push(<CellLine key={i} numbers={numbers[i]}/>)
    } 
    return (
        <div className='GameField'>
            {lines}
        </div>
    )
}

export default GameField