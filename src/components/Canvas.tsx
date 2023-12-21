/**
 * Canvas component
 */

import { useEffect, useRef, useState } from "react";
import initKeyEventHandlers from "../game/keyEvents";
import game from "../game/Game";
import { drawBackground, drawBoundaryLine } from "../render/environment";
import { Button } from "./Button";
import { LoseMessage } from "./LoseMessage";
import { Score } from "./Score";
import { drawBall, drawPaddle } from "../render/objects";
import "./components.css";

const resetGame = (
    setP1Score: React.Dispatch<React.SetStateAction<number>>,
    setP2Score: React.Dispatch<React.SetStateAction<number>>
) => {
    game.resetScores();
    setP1Score(0); // necessary ?
    setP2Score(0);
};

const startNewRound = () => {
    if (!game.hasRoundStarted()) {
        game.startGame();
    }
};

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [p1Score, setP1Score] = useState(0);
    const [p2Score, setP2Score] = useState(0);

    initKeyEventHandlers(game.players, startNewRound);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas === null) {
            throw Error("Canvas failed to load");
        }
        const ctx = canvas.getContext("2d");
        // let frameCount = 0;
        let frameId: number;

        const render = () => {
            if (!ctx) return;
            // frameCount++;

            // Clear the canvas
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            drawBackground(ctx, ctx.canvas.width, ctx.canvas.height);

            // Update canvas
            drawBall(ctx, game.ball);
            drawPaddle(ctx, game.players[0].paddle);
            drawPaddle(ctx, game.players[1].paddle);

            // Game step
            game.step();

            setP1Score(game.players[0].score);
            setP2Score(game.players[1].score);

            // Background
            drawBoundaryLine(ctx);

            frameId = window.requestAnimationFrame(render);
        };
        render();

        return () => {
            window.cancelAnimationFrame(frameId);
        };
    });

    return (
        <>
            <Button
                onClick={() => {
                    resetGame(setP1Score, setP2Score);
                }}
                label="New Game"
            />
            <Button onClick={startNewRound} label="Next Round" />
            <p className="instructions">
                Player 1: 'w', 's' | Player 2: 'o', 'l' | Start round: g
            </p>
            <div className="p1-score">
                <Score score={p1Score}></Score>
            </div>
            <div className="p2-score">
                <Score score={p2Score}></Score>
            </div>

            <LoseMessage show={false}></LoseMessage>
            <canvas
                className="game-canvas"
                height={innerHeight}
                width={innerWidth}
                ref={canvasRef}
            />
        </>
    );
};

export default Canvas;
