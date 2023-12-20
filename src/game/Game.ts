import Ball from "../game-objects/Ball";
import Player from "../game-objects/Player";

/**
 *
 * Track game state data such as beginRound
 * Track score etc.
 *
 * Render middle dead zone with different colour?
 *
 */

enum GameState {
    BEFORE_GAME,
    IN_GAME,
    AFTER_GAME,
}

class Game {
    paddleHeight: number;
    paddleWidth: number;
    playerXPosOffset: number;
    players: Player[];
    windowHeight: number;
    windowWidth: number;
    ball: Ball;
    gameState: GameState;
    constructor() {
        this.paddleHeight = 80;
        this.paddleWidth = 15;
        this.playerXPosOffset = 50;
        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;
        this.players = this.initialisePlayers();
        this.ball = this.initialiseBall();
        this.gameState = GameState.BEFORE_GAME;
    }

    startGame() {
        this.gameState = GameState.IN_GAME;
        this.ball.setPosition(this.windowWidth / 4, this.windowHeight / 2);
        this.ball.startMoving();
        // TODO: reset ball velocity
    }

    initialiseBall() {
        const radius = 8;
        return new Ball(this.windowWidth / 4, this.windowHeight / 2, radius);
    }

    initialisePlayers() {
        const player1 = new Player(0, 0, "w", "s");
        const player2 = new Player(0, 0, "o", "l");

        player1.moveTo(
            this.windowWidth / 2 - player1.paddleWidth - this.playerXPosOffset,
            this.windowHeight / 2 - player1.paddleHeight / 2
        );
        player2.moveTo(
            this.windowWidth / 2 + this.playerXPosOffset,
            this.windowHeight / 2 - player2.paddleHeight / 2
        );

        return [player1, player2];
    }
    moveGameObjects(frame: number) {
        this.players.forEach((player) => {
            if (player.motionHandler.isMovingUp) {
                player.paddle.dy = player.paddle.dyDefault * -1;
                player.paddle.move(this.windowHeight);
            } else if (player.motionHandler.isMovingDown) {
                player.paddle.dy = player.paddle.dyDefault;
                player.paddle.move(this.windowHeight);
            } else {
                player.paddle.dy = 0;
            }
        });
        this.ball.move(this.windowWidth, this.windowHeight, [
            this.players[0].paddle,
            this.players[1].paddle,
        ]);
    }

    drawGameObjects(ctx: CanvasRenderingContext2D) {
        this.players[0].paddle.draw(ctx);
        this.players[1].paddle.draw(ctx);
        this.ball.draw(ctx);
    }
}

const game = new Game();
export default game;
