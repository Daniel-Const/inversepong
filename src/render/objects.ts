import Ball from "../game-objects/Ball";
import Paddle from "../game-objects/Paddle";

/**
 * Draw the ball object onto the canvas
 *
 * @param ctx
 * @param ball
 */
export const drawBall = (ctx: CanvasRenderingContext2D, ball: Ball) => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fillStyle = ball.color;
    ctx.fill();
};

/**
 * Draw the paddle object onto the canvas
 *
 * @param ctx
 * @param paddle
 */
export const drawPaddle = (ctx: CanvasRenderingContext2D, paddle: Paddle) => {
    ctx.fillStyle = paddle.color;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
};
