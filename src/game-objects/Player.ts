import Paddle from './Paddle'

export default class Player {
    paddle: Paddle
    paddleHeight
    paddleWidth
    motionHandler
    upKey
    downKey
    constructor(startX: number, startY: number, upKey: string, downKey: string) {
        this.paddleHeight = 80
        this.paddleWidth = 10
        this.paddle = new Paddle(startX, startY, this.paddleWidth, this.paddleHeight)
        this.motionHandler = {
            isMovingUp: false,
            isMovingDown: false
        }
        this.upKey = upKey
        this.downKey = downKey
    }

    moveTo(x: number, y: number) {
        this.paddle.x = x
        this.paddle.y = y
    }
}