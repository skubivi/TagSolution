import { useSelector } from 'react-redux'
import '../scss/widthScroll.scss'
import { useRef } from 'react'

const WidthScroll = () => {
    const windowWidth = useRef(window.innerWidth)
    const max = useSelector((state) => state.moveBoard.width)
    let temp = -useSelector((state) => state.moveBoard.deltaX)
    let percent = temp / max
    let left = percent * windowWidth.current * 0.8

    const boardWidth = useSelector((state) => state.moveBoard.width)
    const scrollWidth = windowWidth.current / boardWidth * 80

    const styleObj = {
        position: 'absolute',
        left: left + 'px',
        width: scrollWidth + 'vw',
        height: '5vh',
        backgroundColor: 'black',
        borderRadius: '25px',
    }

    return (
        <div className='WidthScroll'>
            <div className='Scroller' style={styleObj}>

            </div>
        </div>
    )
}

export default WidthScroll