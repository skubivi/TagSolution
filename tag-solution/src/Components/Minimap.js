import { useSelector } from 'react-redux'
import { useRef } from 'react'
import '../scss/minimap.scss'
import Canvas from './Canvas'

const Minimap = () => {
    const windowWidth = useRef(window.innerWidth)
    const windowHeight = useRef(window.innerHeight)
    const ratio = windowWidth.current / windowHeight.current
    const width = useSelector((state) => state.moveBoard.width)
    const height = useSelector((state) => state.moveBoard.height)
    const currentX = -useSelector((state) => state.moveBoard.deltaX)
    const currentY = -useSelector((state) => state.moveBoard.deltaY)
    const percentX = currentX / (width - windowWidth.current)
    const percentY = currentY / (height - windowHeight.current)
    const k = 250
    const cameraWidth = windowWidth.current / width * k * ratio
    const cameraHeight = windowHeight.current / height * k
    const left = percentX * k * ratio * (1 - cameraWidth / k / ratio) - 2
    const top = percentY * k * (1 - cameraHeight / k) - 2

    const allFields = useSelector((state) => state.fieldsOnBoard.fields)
    const allFieldsSize = useSelector((state) => state.fieldsOnBoard.size)

    const styleCamera = {
        position: 'absolute',
        left: left + 'px',
        top: top + 'px',
        width: cameraWidth + 'px',
        height: cameraHeight + 'px',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: '2px'
    }

    const minimapLeft = windowWidth.current - k * ratio - 30

    const styleMinimap = {
        top: '30px',
        left: minimapLeft + 'px',
        height: k + 'px',
        width: k * ratio + 'px'
    }

    const getCenterX = () => {
        return k * ratio / 2
    }

    const getCenterY = () => {
        return k / 2
    }

    const getPointX = (n) => {
        return getCenterX() + n * 360 * k * ratio / width
    }

    const getPointY = (n) => {
        return getCenterY() + n * 360 * k / height
    }

    const startPointStyle = {
        backgroundColor: 'green',
        left: getCenterX() - 5 + 'px',
        top: getCenterY() - 5 + 'px'
    }

    const endPointCoordinates = [allFields[allFieldsSize - 1].x, allFields[allFieldsSize - 1].y]
    const endPointStyle = {
        backgroundColor: 'red',
        left: getPointX(endPointCoordinates[0]) - 5 + 'px',
        top: getPointY(endPointCoordinates[1]) - 5 + 'px'
    }
    const getRadians = (x, y) => {
        const n = y / x
        return Math.atan(n)
    }
    const dX = (x1, x2) => {
        return Math.abs(x1 - x2) * 360 * k * ratio / width
    }
    const dY = (y1, y2) => {
        return Math.abs(y1 - y2) * 360 * k / height
    }
    const getR = (x1, y1, x2, y2) => {
        const deX = dX(x1, x2)
        const deY = dY(y1, y2)
        return Math.sqrt(deX * deX + deY * deY)
    }
    const lines = []
    const points = []
    let running = true
    let currentPoint = allFields[allFieldsSize - 1]
    while (running) {
        const nextPointId = currentPoint.parent
        let nextPoint
        for(let i = 0; i < allFieldsSize; i++) {
            if (allFields[i].id === nextPointId) {
                nextPoint = allFields[i]
                break
            }
        }
        lines.push([getPointX(currentPoint.x), getPointY(currentPoint.y), getPointX(nextPoint.x), getPointY(nextPoint.y)])

        currentPoint = nextPoint
        if (currentPoint.parent === 'none') running = false
        else {
            const pointStyle = {
                backgroundColor: 'blue',
                left: getPointX(currentPoint.x) - 5 + 'px',
                top: getPointY(currentPoint.y) - 5 + 'px'
            }
            points.push(<div className='point' style={pointStyle} key={currentPoint.id}></div>)
        }
    }

    const canvasWidth = k * ratio
    const canvasHeight = k

    const highlight = useSelector((state) => state.fieldsOnBoard.highlight)
    const highlightenElement = useSelector((state) => state.fieldsOnBoard.highlightenElement)

    const highlightPointStyle = {
        backgroundColor: 'grey',
        width: '20px',
        height: '20px',
        borderRadius: '10px',
        left: getPointX(highlightenElement[0]) - 10 + 'px',
        top: getPointY(highlightenElement[1]) - 10 + 'px'
    }

    return (
        <div className='Minimap' style={styleMinimap}>
            <div className='Camera' style={styleCamera} />
            <Canvas lines={lines} width={canvasWidth} height={canvasHeight} />
            <div className='point' style={highlight ? highlightPointStyle : {display: 'none'}} />
            <div className='point' style={startPointStyle} />
            <div className='point' style={endPointStyle} />
            {points}
        </div>
    )
}

export default Minimap