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
    ROUND_LOST,
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
    servePlayer: number; // Who's turn to start
    constructor() {
        this.paddleHeight = 80;
        this.paddleWidth = 15;
        this.playerXPosOffset = 50;
        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;
        this.players = this.initialisePlayers();
        this.ball = this.initialiseBall();
        this.gameState = GameState.BEFORE_GAME;
        this.servePlayer = 0;

        this.resetPlayerPositions();
        this.resetBallPosition();
    }

    resetScores() {
        this.players[0].score = 0;
        this.players[1].score = 0;
    }

    startGame() {
        this.gameState = GameState.IN_GAME;
        this.ball.startMoving(
            this.servePlayer,
            this.players[this.servePlayer].paddle.dy
        );
    }

    initialiseBall() {
        const radius = 8;
        return new Ball(this.windowWidth / 4, this.windowHeight / 2, radius);
    }

    initialisePlayers() {
        const player1 = new Player(0, 0, "w", "s");
        const player2 = new Player(0, 0, "o", "l");

        return [player1, player2];
    }

    resetBallPosition() {
        if (this.servePlayer == 0) {
            const paddle = this.players[0].paddle;
            this.ball.setPosition(paddle.x - 5, paddle.y + paddle.height / 2);
        } else {
            const paddle = this.players[1].paddle;
            this.ball.setPosition(
                paddle.x + paddle.width + 5,
                paddle.y + paddle.height / 2
            );
        }
    }

    changeStartTurn() {
        this.servePlayer ^= 1;
        this.ball.dx *= -1;
    }

    resetPlayerPositions() {
        // Reset player positions
        this.players[0].moveTo(
            this.windowWidth / 2 -
                this.players[0].paddleWidth -
                this.playerXPosOffset,
            this.windowHeight / 2 - this.players[0].paddleHeight / 2
        );
        this.players[1].moveTo(
            this.windowWidth / 2 + this.playerXPosOffset,
            this.windowHeight / 2 - this.players[1].paddleHeight / 2
        );
    }

    isBallOutOfBounds(): boolean {
        return this.ball.intersects({
            topLeft: [this.windowWidth / 2, 0],
            bottomRight: [this.windowWidth / 2, this.windowHeight],
        });
    }

    private movePlayers() {
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
    }

    private moveBall() {
        this.ball.move(this.windowWidth, this.windowHeight, [
            this.players[0].paddle,
            this.players[1].paddle,
        ]);
    }

    step() {
        this.moveBall();
        this.movePlayers();
        if (this.gameState === GameState.BEFORE_GAME) {
            this.resetBallPosition();
        }

        const winner = this.checkWin();
        if (winner !== null && this.gameState == 2) {
            this.resetPlayerPositions();
            this.changeStartTurn();
            this.resetBallPosition();
            this.gameState = GameState.BEFORE_GAME;
        }
    }

    checkWin(): number | null {
        if (this.isBallOutOfBounds()) {
            this.gameState = GameState.ROUND_LOST;
            const winner = this.ball.dx < 0 ? 1 : 0;
            this.players[winner].score++;
            return winner;
        }
        return null;
    }

    hasRoundStarted() {
        return this.gameState === GameState.IN_GAME;
    }
}

const game = new Game();
export default game;
