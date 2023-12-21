export type BoundingBox = {
    topLeft: [x1: number, y2: number];
    bottomRight: [x2: number, y2: number];
};

export abstract class GameObject {
    x: number; // X position
    y: number; // Y position
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    abstract getBoundingBox(): BoundingBox;

    /**
     * Change the position on the canvas
     *
     * @param x
     * @param y
     */
    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Determine whether this game object intersects another
     *
     * @param obj
     * @returns boolean
     */
    intersects(box: BoundingBox): boolean {
        const { topLeft: pMinA, bottomRight: pMaxA } = box;
        const { topLeft: pMinB, bottomRight: pMaxB } = this.getBoundingBox();

        const a = pMaxA[0] < pMinB[0];
        const b = pMinA[0] > pMaxB[0];
        const c = pMinA[1] > pMaxB[1];
        const d = pMaxA[1] < pMinB[1];

        return !(a || b || c || d);
    }
}
