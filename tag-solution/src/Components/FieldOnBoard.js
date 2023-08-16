import { useDispatch, useSelector } from 'react-redux'
import '../scss/fieldOnBoard.scss'
import { setNeighbors } from '../store/slices/neighborsSlice'

const FieldOnBoard = (props) => {
    const numbers = props.field.field
    const allFields = useSelector((state) => state.fieldsOnBoard.fields)
    const allFieldsSize = useSelector((state) => state.fieldsOnBoard.size)

    const dispatch = useDispatch()

    const showNeighbors = (e) => {
        if (e.button === 2) {
            const id = props.field.id
            const neighbors = []
            for (let i = 0; i < allFieldsSize; i++) {
                if (props.field.parent === allFields[i].id) {
                    const temp = {
                        field: allFields[i].field,
                        x: allFields[i].x,
                        y: allFields[i].y,
                        id: allFields[i].id,
                        isParent: true,
                        parent: allFields[i].parent
                    }
                    neighbors.push(temp)
                }
                if (id === allFields[i].parent) {
                    const temp = {
                        field: allFields[i].field,
                        x: allFields[i].x,
                        y: allFields[i].y,
                        id: allFields[i].id,
                        isParent: false,
                        parent: allFields[i].parent
                    }
                    neighbors.push(temp)
                }
            }
            dispatch(setNeighbors({id, neighbors}))
        }
    }

    return (
        <div className="Field4" style={props.style} onMouseDown={showNeighbors}>
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
    )
}

export default FieldOnBoard