/**
 * Canvas component
 */

import { useEffect, useRef, useState } from "react";
import initKeyEventHandlers from "../game/keyEvents";
import game from "../game/Game";
import { drawBackground, drawBoundaryLine } from "../render/environment";
import { Score } from "./Score";
import { drawBall, drawPaddle } from "../render/objects";
import "./components.css";
import { Menu } from "./Menu";
import { MenuToggle } from "./MenuToggle";

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
    const [toggleMenu, setToggleMenu] = useState(true);

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
            <div className="game-window">
                <MenuToggle
                    toggleMenu={toggleMenu}
                    setToggleMenu={setToggleMenu}
                ></MenuToggle>
                {toggleMenu && (
                    <Menu
                        onNewGame={() => {
                            resetGame(setP1Score, setP2Score);
                            setToggleMenu(false);
                        }}
                    ></Menu>
                )}
                <div className="p1-score">
                    <Score score={p1Score}></Score>
                </div>
                <div className="p2-score">
                    <Score score={p2Score}></Score>
                </div>
                <canvas
                    className="game-canvas"
                    height={innerHeight}
                    width={innerWidth}
                    ref={canvasRef}
                />
            </div>
        </>
    );
};

export default Canvas;
