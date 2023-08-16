import { useDispatch, useSelector } from 'react-redux'
import '../scss/gameField.scss'
import CellLine from './CellLine'
import { nextWindow, setReady } from '../store/slices/gameFieldSlice'
import { checkedPush, end, needToCheckPush, needToCheckRemove, setStartPoint } from '../store/slices/aStarSlice'

const GameField = () => {
    const numbers = useSelector((state) => state.gameField.field)
    let lines = []
    for (let i = 0; i <  4; i++) {
        lines.push(<CellLine key={i} numbers={numbers[i]}/>)
    } 
    const dispatch = useDispatch()

    //Верно
    const heuristic = (field) => {
        let sum = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let x
                let y
                if (field[i][j] === 0) {
                    continue
                }
                else {
                    y = (field[i][j] - 1) % 4
                    x = (field[i][j] - 1 - y) / 4
                }
                let temp1 = i - x
                let temp2 = j - y
                if (temp1 < 0) temp1 = -temp1
                if (temp2 < 0) temp2 = -temp2
                sum += temp1 + temp2 
            }
        }
        return sum
    }

    const linearConflict = (field) => {
        let result = 0
        let used = []
        let temp = [0, 0, 0]
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if ((field[i][j] / 4 <= i + 1) && (field[i][j] / 4 > i) && (field[i][j] !== i * 4 + 1 + j) && (field[i][j] !== 0)) {
                    temp[i] += 1
                }
            }
        }
        for (let i = 0; i < 4; i++) {
            if (temp[i] >= 2) {
                let k = 0
                result += 2
                for (let j = 0; j < 4; j++) {
                    if (k >= 2) break
                    if ((field[i][j] / 4 <= i + 1) && (field[i][j] / 4 > i) && (field[i][j] !== i * 4 + 1 + j) && (field[i][j] !== 0)) {
                        used.push(field[i][j])
                        k+=1
                    }
                }
            }
        }
        temp = [0, 0, 0]
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if ((field[i][j] % 4 === ((j + 1) % 4)) && (field[i][j] !== i * 4 + 1 + j) && (field[i][j] !== 0) && !(used.some((element) => element === field[i][j]))) {
                    temp[j] += 1
                }
            }
        }
        for (let i = 0; i < 4; i++) {
            if (temp[i] >= 2) {
                result += 2
            }
        }
        return result
    }


    //Верно
    const makePoint = (field, id, g, parent) => {
        const h = heuristic(field)
        const f = h + g
        const point = {
            field,
            id,
            g,
            h,
            f,
            parent
        }
        return point
    }


    //Верно
    const makeNeighbors = (point, id) => {
        let tempId = id
        let x
        let y
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (point.field[i][j] === 0) {
                    x = i
                    y = j
                }
            }
        }
        let result = []
        let newG = point.g + 1
        let newParent = point.id
        if (x < 3) {
            tempId++
            let newField = point.field.slice()
            let temp = newField[x+1][y]
            newField = newField.map((n, i) => i === x
            ? n.map((m, j) => j === y ? temp : m) : n)
            newField = newField.map((n, i) => i === (x + 1)
            ? n.map((m, j) => j === y ? 0 : m) : n)
            let newPoint = makePoint(newField, tempId, newG, newParent)
            result.push(newPoint)
        }
        if (x > 0) {
            tempId++
            let newField = point.field.slice()
            let temp = newField[x-1][y]
            newField = newField.map((n, i) => i === x
            ? n.map((m, j) => j === y ? temp : m) : n)
            newField = newField.map((n, i) => i === (x - 1)
            ? n.map((m, j) => j === y ? 0 : m) : n)
            let newPoint = makePoint(newField, tempId, newG, newParent)
            result.push(newPoint)
        }
        if (y > 0) {
            tempId++
            let newField = point.field.slice()
            let temp = newField[x][y - 1]
            newField = newField.map((n, i) => i === x
            ? n.map((m, j) => j === y ? temp : m) : n)
            newField = newField.map((n, i) => i === x
            ? n.map((m, j) => j === (y - 1) ? 0 : m) : n)
            let newPoint = makePoint(newField, tempId, newG, newParent)
            result.push(newPoint)
        }
        if (y < 3) {
            tempId++
            let newField = point.field.slice()
            let temp = newField[x][y + 1]
            newField = newField.map((n, i) => i === x
            ? n.map((m, j) => j === y ? temp : m) : n)
            newField = newField.map((n, i) => i === x
            ? n.map((m, j) => j === (y + 1) ? 0 : m) : n)
            let newPoint = makePoint(newField, tempId, newG, newParent)
            result.push(newPoint)
        }
        return result
    }


    //верно
    const include = (point, arr) => {
        for (let i = 0; i < arr.length; i++) {
            let check = true
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < 4; k++) {
                    if (!(point.field[j][k] === arr[i].field[j][k])) {
                        check = false
                    }
                }
            }
            if (check) return true
        }
        return false
    }

    const aStarAlgo = (startPoint) => {
        let id = 0
        let needToCheckTemp = []
        let checkedTemp = []
        dispatch(setStartPoint(startPoint))
        dispatch(needToCheckPush(startPoint))
        needToCheckTemp.push(startPoint)
        while (needToCheckTemp.length > 0) {
            
            let current = needToCheckTemp[0]
            for (let i = 1; i < needToCheckTemp.length; i++) {
                if (current.f > needToCheckTemp[i].f) current = needToCheckTemp[i]
            }
            if (current.h === 0) {
                dispatch(checkedPush(current))
                dispatch(end())
                dispatch(setReady())
                return true
            }
            dispatch(needToCheckRemove(current))
            needToCheckTemp = needToCheckTemp.filter((point) => {return !(point.id === current.id)})
            dispatch(checkedPush(current))
            checkedTemp.push(current)
            let neighbors = makeNeighbors(current, id)
            id += neighbors.length
            for (let i = 0; i < neighbors.length; i++) {
                if (!include(neighbors[i], checkedTemp)) {
                    if (!include(neighbors[i], needToCheckTemp)) {
                        dispatch(needToCheckPush(neighbors[i]))
                        needToCheckTemp.push(neighbors[i])
                    }
                }
            }
        }
        return false
    }

    const buttonClickHandler = (e) => {
        dispatch(nextWindow())
        let startPoint = makePoint(numbers, 0, 0, 'none')
        setTimeout(() => {
            aStarAlgo(startPoint)
        }, 2500)
    } 
    return (
        <div className='wrapper'>
            <div className='GameField'>
                {lines}
            </div>
            <button onClick={buttonClickHandler}>Найти решение</button>
        </div>
    )
}

export default GameField