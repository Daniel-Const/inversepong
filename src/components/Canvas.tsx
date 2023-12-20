/**
 * Canvas component
 */

import { useEffect, useRef } from "react"
import initKeyEventHandlers from "../game/keyEvents"
import game from '../game/Game'
import { drawBackground } from "../game/environment"
import { Button } from "./Button"

const startGame = () => {
    game.startGame()
}

const Canvas = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    initKeyEventHandlers()

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas === null) {
            throw Error('Canvas failed to load')
        }
        const ctx = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId: number

        const render = () => {
            if (!ctx) return
            frameCount++;

            // Clear the canvas
            ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

            game.drawGameObjects(ctx)
            game.moveGameObjects(frameCount)

            // Background
            drawBackground(ctx, game.windowWidth, game.windowHeight)


            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        }
    }, )

    return (
        <>
        <Button onClick={startGame}></Button>
        <canvas height={innerHeight} width={innerWidth} ref={canvasRef} />
        </>
    )
}

export default Canvas