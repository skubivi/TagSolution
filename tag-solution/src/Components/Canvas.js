import { useEffect, useRef } from "react"

const Canvas = (props) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = props.width
        canvas.height = props.height
        const context = canvas.getContext('2d')
        for (let i = 0; i < props.lines.length; i++) {
            context.beginPath()
            context.moveTo(Math.floor(props.lines[i][0]), Math.floor(props.lines[i][1]))
            context.lineTo(Math.floor(props.lines[i][2]), Math.floor(props.lines[i][3]))
            context.strokeStyle = 'black'
            context.lineWidth = 1
            context.stroke()
        }
    }, [canvasRef])

    return <canvas ref={canvasRef}/>
}

export default Canvas