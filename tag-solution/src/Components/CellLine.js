import '../scss/cellLine.scss'
import Cell from './Cell'

const CellLine = (props) => {
    let cells = []
    for (let i = 0; i < 4; i++) {
        cells.push(<Cell key={i} number={props.numbers[i]}/>)
    }
    return (
        <div className='CellLine'>
            {cells}
        </div>
    )
}

export default CellLine