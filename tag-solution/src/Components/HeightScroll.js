import { useSelector } from 'react-redux'
import '../scss/heightScroll.scss'
import { useRef } from 'react'

const HeightScroll = () => {
    const windowHeight = useRef(window.innerHeight)
    const max = windowHeight.current
    let temp = -useSelector((state) => state.moveBoard.deltaY)
    let percent = temp / max
    let top = percent * windowHeight.current * 0.68
    console.log(percent)

    const styleObj = {
        position: 'absolute',
        top: top + 'px',
        width: '2.5vw',
        height: '12vh',
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