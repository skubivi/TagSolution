import '../scss/cellLine.scss'
import Cell from './Cell'

const CellLine = () => {
    let cells = []
    for (let i = 0; i < 40; i++) {
        cells.push(<Cell key={i}/>)
    }
    return (
        <div className='CellLine'>
            {cells}
        </div>
    )
}

export default CellLine