import { useSelector } from 'react-redux'
import '../scss/heightScroll.scss'
import { useRef } from 'react'

const HeightScroll = () => {
    const windowHeight = useRef(window.innerHeight)
    const max = useSelector((state) => state.moveBoard.height)
    let temp = -useSelector((state) => state.moveBoard.deltaY)
    let percent = temp / max
    let top = percent * windowHeight.current * 0.8

    const boardHeight = useSelector((state) => state.moveBoard.height)
    const scrollHeight= windowHeight.current / boardHeight * 80

    const styleObj = {
        position: 'absolute',
        top: top + 'px',
        width: '2.5vw',
        height: scrollHeight + 'vh',
        backgroundColor: 'black',
        borderRadius: '25px',
    }

    return (
        <div className='HeightScroll'>
            <div className='Scroller' style={styleObj}>

            </div>
        </div>
    )
}

export default HeightScroll