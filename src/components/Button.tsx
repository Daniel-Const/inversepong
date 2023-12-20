import { MouseEventHandler } from "react"
import './components.css'

export const Button = ({onClick}: {onClick: MouseEventHandler}) => {
    return(
        <>
        <button onClick={onClick} className="start-button">Start</button>
        </>
    )
}