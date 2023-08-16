import { useState } from 'react'
import '../scss/loaderScreen.scss'

const LoaderScreen = (props) => {
    const [afterEnd, setAfterEnd] = useState(false)
    const containerClass = () => {
        if (!props.start) return ' beforeStart'
        return ''
    }
    const loadingStart = () => {
        if (props.start) return ' start'
        return ''
    }
    const loadingEnd = () => {
        if (props.end) {
            setTimeout(() => {
                setAfterEnd(true)
            }, 2000)
            return ' end'
        }
        return ''
    }
    const checkAfterEnd = () => {
        if (afterEnd) return ' afterEnd'
        return ''
    }
    return (
        <div className={'container' + containerClass() + checkAfterEnd()}>
            <div className={'LoaderScreen' + loadingStart() + loadingEnd()}>
                <span className="loader"></span>
            </div>
        </div>
    )
}

export default LoaderScreen