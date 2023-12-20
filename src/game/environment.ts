

export const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.beginPath()
    ctx.moveTo(ctx.canvas.width / 2, 0)
    ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height)
    ctx.strokeStyle = 'white'
    ctx.stroke()
}