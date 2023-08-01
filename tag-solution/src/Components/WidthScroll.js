import { useSelector } from 'react-redux'
import '../scss/widthScroll.scss'
import { useRef } from 'react'

const WidthScroll = () => {
    const windowWidth = useRef(window.innerWidth)
    const max = windowWidth.current
    let temp = -useSelector((state) => state.moveBoard.deltaX)
    let percent = temp / max
    let left = percent * windowWidth.current * 0.72
    console.log(percent)

    const styleObj = {
        position: 'absolute',
        left: left + 'px',
        width: '8vw',
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