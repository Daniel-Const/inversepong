import { GameObject, BoundingBox } from "./GameObject";
import Paddle from "./Paddle";

export default class Ball extends GameObject {
    radius: number;

    dx: number; // X velocity
    dy: number; // Y Velocity
    dxDefault: number;
    dyDefault: number;

    dyMax: number;
    dxMax: number;

    bd: number; // Offset from centre for collision box
    color: string;

    momentumTransfer: number;
    constructor(x: number, y: number, radius: number) {
        super(x, y);
        this.radius = radius;

        this.dxDefault = -10;
        this.dyDefault = 0;
        this.dxMax = 10;
        this.dyMax = 10;

        this.dx = 0;
        this.dy = 0;
        this.bd = this.radius * 0.8;
        this.color = "white";
        this.momentumTransfer = 0.6;
    }

    startMoving(servePlayer: number, paddleDy: number) {
        // dx direction depends on player turn
        this.dx = this.dxDefault * (servePlayer == 0 ? 1 : -1);

        // Add momentum from paddle
        this.dy = this.dyDefault;
        this.dy = this.getDyWithPaddleMomentum(paddleDy);
    }

    getDyWithPaddleMomentum(paddleDy: number): number {
        const dy = this.dy + paddleDy * this.momentumTransfer;
        return Math.abs(dy) > this.dyMax ? this.dyMax * Math.sign(dy) : dy;
    }

    move(boundX: number, boundY: number, paddles: Paddle[]) {
        this.x += this.dx;
        this.y += this.dy;

        // Hit a paddle
        paddles.forEach((paddle: Paddle) => {
            if (this.intersects(paddle.getBoundingBox())) {
                // Update velocities
                this.dx *= -1;

                this.dy = this.getDyWithPaddleMomentum(paddle.dy);

                // Update position
                this.x += Math.sign(this.dx);
                return;
            }
        });

        if (this.x > boundX) {
            this.x = this.radius;
            this.y = boundY - this.y;
        }

        if (this.x < 0 - this.radius) {
            this.x = boundX - this.radius;
            this.y = boundY - this.y;
        }

        if (this.y > boundY) {
            this.y = 0 - this.radius;
            this.x = boundX - this.x;
        }

        if (this.y < 0 - this.radius) {
            this.y = boundY - this.radius;
            this.x = boundX - this.x;
        }
    }

    getBoundingBox(): BoundingBox {
        return {
            topLeft: [this.x - this.bd, this.y - this.bd],
            bottomRight: [this.x + this.bd, this.y + this.bd],
        };
    }
}
