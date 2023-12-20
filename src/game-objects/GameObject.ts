export type BoundingBox = {
    topLeft:     [x1: number, y2: number],
    bottomRight: [x2: number, y2: number]
}

export abstract class GameObject {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract getBoundingBox(): BoundingBox

    setPosition(x: number, y: number) {
        this.x = x
        this.y = y
    }
    
    intersects(obj: GameObject) {
        const { topLeft: pMinA, bottomRight: pMaxA } = obj.getBoundingBox()
        const { topLeft: pMinB, bottomRight: pMaxB } = this.getBoundingBox()

        const a = pMaxA[0] < pMinB[0]
        const b = pMinA[0] > pMaxB[0]
        const c = pMinA[1] > pMaxB[1]
        const d = pMaxA[1] < pMinB[1]

        return !(a || b || c || d)
    }
}