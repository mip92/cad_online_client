import Tool from "./Tool";
import {LineObject} from "./LineObject";
import {Crossing} from "../utils/crossing";
import {DotObject} from "./dotObject";
import {Objects} from "./Objects";

export default class Line extends Tool {
    arr = []
    obj

    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen()

    }

    listen() {
        document.onmousemove = this.mouseMoveHandler.bind(this)
        document.onmousedown = this.mouseDownHandler.bind(this)
        document.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e) {
        if (e.target === this.canvas) {
            this.mouseDown = false
            const img = new Image()
            img.src = this.saved
            img.onload = () => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)

            }
            this.obj = new LineObject(new DotObject(this.startX, this.startY), new DotObject(e.pageX - e.target.offsetLeft, e.pageY - 120), this.ctx)
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: this.obj
            }))
            Objects.setObject(this.obj)
            console.log(Objects.getObjects())
           // this.arr.push(this.obj)
            //console.log(this.getLines())
        }
    }

    mouseDownHandler(e) {
        if (e.path[0] === this.canvas && e.target===this.canvas) {
            this.mouseDown = true
            this.ctx.beginPath()
            this.startX = e.pageX - e.target.offsetLeft
            this.startY = e.pageY - 120
            this.ctx.moveTo(this.startX, this.startY)
            this.saved = this.canvas.toDataURL()
           // this.obj = new LineObject(new DotObject(this.startX, this.startY))
        }
    }

    mouseMoveHandler(e) {
        if (this.mouseDown && e.target===this.canvas) {
            if (e.path[0] !== this.canvas) {
                this.mouseDown = false
            } else {
                this.draw(e.pageX - e.target.offsetLeft, e.pageY - 120)
            }
        }
    }

    draw(x, y) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(this.startX, this.startY)
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }
    }

    static staticDraw(ctx, start, finish) {
        ctx.beginPath();       // Start a new path
        ctx.moveTo(start.x, start.y);    // Move the pen to (30, 50)
        ctx.lineTo(finish.x, finish.y);  // Draw a line to (150, 100)
        ctx.stroke();
        /*ctx.lineTo(x, y)
        ctx.stroke()*/
    }

    getLines() {
        return this.arr
    }

}