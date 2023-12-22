import { GameObject, BoundingBox } from "./GameObject";

class Paddle extends GameObject {
    dy: number;
    dyDefault: number;

    width: number;
    height: number;

    color: string;
    constructor(
        x: number,
        y: number,
        width: number = 100,
        height: number = 50
    ) {
        super(x, y);
        this.dy = 0;
        this.dyDefault = 8.5;
        this.width = width;
        this.height = height;
        this.color = "white";
    }

    /**
     * Move the paddle y pos by its veolcity dy
     * Handle boundary checking logic
     *
     * @param boundary
     */
    move(boundary: number) {
        // TODO: Handle wrapping around from top-bottom / bottom-top
        if (this.y + this.dy < 0) {
            this.y = 0;
        } else if (this.y + this.dy > boundary - this.height) {
            this.y = boundary - this.height;
        } else {
            this.y += this.dy;
        }
    }

    /**
     * Get the top left, bottom right coordinates of the
     * paddle
     *
     * @returns BoundingBox
     */
    getBoundingBox(): BoundingBox {
        return {
            topLeft: [this.x, this.y],
            bottomRight: [this.x + this.width, this.y + this.height],
        };
    }
}

export default Paddle;
