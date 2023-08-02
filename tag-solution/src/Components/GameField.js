import { useDispatch, useSelector } from 'react-redux'
import '../scss/gameField.scss'
import CellLine from './CellLine'
import { nextWindow } from '../store/slices/gameFieldSlice'
import { checkedPush, end, needToCheckPush, needToCheckRemove, setStartPoint } from '../store/slices/aStarSlice'

const GameField = () => {
    const numbers = useSelector((state) => state.gameField.field)
    let lines = []
    for (let i = 0; i <  3; i++) {
        lines.push(<CellLine key={i} numbers={numbers[i]}/>)
    } 
    const dispatch = useDispatch()

    const heuristic = (field) => {
        let sum = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let x
                let y
                if (field[i][j] === 0) {
                    x = 2
                    y = 2
                }
                else {
                    y = (field[i][j] - 1) % 3
                    x = (field[i][j] - 1 - y) / 3
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
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if ((field[i][j] / 3 <= i + 1) && (field[i][j] / 3 > i) && (field[i][j] !== i * 3 + 1 + j) && (field[i][j] !== 0)) {
                    temp[i] += 1
                }
            }
        }
        for (let i = 0; i < 3; i++) {
            if (temp[i] >= 2) {
                let k = 0
                result += 2
                for (let j = 0; j < 3; j++) {
                    if (k >= 2) break
                    if ((field[i][j] / 3 <= i + 1) && (field[i][j] / 3 > i) && (field[i][j] !== i * 3 + 1 + j) && (field[i][j] !== 0)) {
                        used.push(field[i][j])
                        k+=1
                    }
                }
            }
        }
        temp = [0, 0, 0]
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if ((field[i][j] % 3 === ((j + 1) % 3)) && (field[i][j] !== i * 3 + 1 + j) && (field[i][j] !== 0) && !(used.some((element) => element === field[i][j]))) {
                    temp[j] += 1
                }
            }
        }
        for (let i = 0; i < 3; i++) {
            if (temp[i] >= 2) {
                result += 2
            }
        }
        return result
    }

    const makePoint = (field, x, y, g, parent) => {
        const h = heuristic(field) + linearConflict(field)
        const f = h + g
        const point = {
            field,
            x,
            y,
            g,
            h,
            f,
            parent
        }
        return point
    }

    const makeNeighbors = (point) => {
        let x
        let y
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (point.field[i][j] === 0) {
                    x = i
                    y = j
                }
            }
        }
        let result = []
        let newG = point.g + 1
        if (x < 2) {
            let newX = point.x
            let newY = point.y + 1
            let newParent = 'top'
            let newField = point.field.slice()
            let temp = newField[x+1][y]
            newField = newField.map((n, i) => i === x
            ? n.map((m, j) => j === y ? temp : m) : n)
            newField = newField.map((n, i) => i === x + 1
            ? n.map((m, j) => j === y ? 0 : m) : n)
            let newPoint = makePoint(newField, newX, newY, newG, newParent)
            result.push(newPoint)
        }
        if (x > 0) {
            let newX = point.x
            let newY = point.y - 1
            let newParent = 'bottom'
            let newField = point.field.slice()
            let temp = newField[x-1][y]
            newField = newField.map((n, i) => i === x
            ? n.map((m, j) => j === y ? temp : m) : n)
            newField = newField.map((n, i) => i === x - 1
            ? n.map((m, j) => j === y ? 0 : m) : n)
            let newPoint = makePoint(newField, newX, newY, newG, newParent)
            result.push(newPoint)
        }
        if (y > 0) {
            let newX = point.x - 1
            let newY = point.y
            let newParent = 'right'
            let newField = point.field.slice()
            let temp = newField[x][y - 1]
            newField = newField.map((n, i) => i === x
            ? n.map((m, j) => j === y ? temp : m) : n)
            newField = newField.map((n, i) => i === x
            ? n.map((m, j) => j === y - 1 ? 0 : m) : n)
            let newPoint = makePoint(newField, newX, newY, newG, newParent)
            result.push(newPoint)
        }
        if (y < 2) {
            let newX = point.x + 1
            let newY = point.y
            let newParent = 'left'
            let newField = point.field.slice()
            let temp = newField[x][y + 1]
            newField = newField.map((n, i) => i === x
            ? n.map((m, j) => j === y ? temp : m) : n)
            newField = newField.map((n, i) => i === x
            ? n.map((m, j) => j === y + 1 ? 0 : m) : n)
            let newPoint = makePoint(newField, newX, newY, newG, newParent)
            result.push(newPoint)
        }
        return result
    }

    const include = (point, arr) => {
        for (let i = 0; i < arr.length; i++) {
            let check = true
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
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
        let needToCheckTemp = []
        let checkedTemp = []
        dispatch(setStartPoint(startPoint))
        dispatch(needToCheckPush(startPoint))
        needToCheckTemp.push(startPoint)
        let k = 0
        while (needToCheckTemp.length > 0) {
            k++
            let current = needToCheckTemp[0]
            for (let i = 1; i < needToCheckTemp.length; i++) {
                if (current.f > needToCheckTemp[i].f) current = needToCheckTemp[i]
            }
            if (current.h === 0) {
                dispatch(end())
                console.log(checkedTemp.length);
                return true
            }
            dispatch(needToCheckRemove(current))
            needToCheckTemp = needToCheckTemp.filter((point) => {return !(point.x === current.x && point.y === current.y)})
            dispatch(checkedPush(current))
            checkedTemp.push(current)
            let neighbors = makeNeighbors(current)
            for (let i = 0; i < neighbors.length; i++) {
                if (!include(neighbors[i], checkedTemp)) {
                    if (!include(neighbors[i], needToCheckTemp)) {
                        dispatch(needToCheckPush(neighbors[i]))
                        needToCheckTemp.push(neighbors[i])
                    }
                }
            }
        }
        console.log(checkedTemp.length);
        return false
    }

    const buttonClickHandler = (e) => {
        dispatch(nextWindow())
        let startPoint = makePoint(numbers, 0, 0, 0, 'none')
        let xd = aStarAlgo(startPoint)
        console.log(xd);
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