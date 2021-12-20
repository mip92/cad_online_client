import Tool from "./Tool";
import {SquareObject} from "./squareObject";
import {LineObject} from "./LineObject";
import {DotObject} from "./dotObject";
import {within} from "@testing-library/react";
import {Objects} from "./Objects";
import {Crossing} from "../utils/crossing";

export default class Square extends Tool {
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
        this.mouseDown = false
        let line12=new LineObject(new DotObject(this.startX,this.startY),new DotObject(this.startX,this.startY+this.height))
        let line23=new LineObject(new DotObject(this.startX,this.startY+this.height), new DotObject(this.startX+this.width,this.startY+this.height))
        let line34=new LineObject(new DotObject(this.startX+this.width,this.startY+this.height), new DotObject(this.startX+this.width,this.startY))
        let line41=new LineObject(new DotObject(this.startX+this.width,this.startY), new DotObject(this.startX,this.startY))
        this.obj=new SquareObject(line12,line23,line34,line41)
        this.socket.send(JSON.stringify({
            method: 'highlight',
            id: this.id,
            figure: {
                type: 'rect',
                x: this.startX,
                y: this.startY,
                height: this.height,
                width: this.width,
                //fillColor:this.ctx.fillStyle
            }
        }))
        const img = new Image()
        let crossing = new Crossing(Objects.getObjects(),this.obj)
        let arr =crossing.getResult()
        arr.map(l=>l.selectedLine=true)
        console.log(arr)
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
        }

    }

    mouseDownHandler(e) {
        if (e.path[0] === this.canvas) {
            this.startX = e.pageX - this.canvas.offsetLeft;
            this.startY = e.pageY - 120;
            this.mouseDown = true
            this.ctx.beginPath()
            this.saved = this.canvas.toDataURL()
        }
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            if (e.path[0] !== this.canvas) {
                this.mouseDown = false
                //  this.draw(e.pageX - this.canvas.offsetLeft, e.pageY - 120)
            } else {
                let currentX = e.pageX - this.canvas.offsetLeft;
                let currentY = e.pageY - 120;
                this.width = currentX - this.startX;
                this.height = currentY - this.startY;
                this.draw(this.startX, this.startY, this.width, this.height)
            }
        }
    }

    draw(x, y, w, h) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.strokeStyle='blue'
            this.ctx.fillStyle = "rgba(100,150,185,0.5)";

            this.ctx.rect(x, y, w, h);
            this.ctx.fill();
            this.ctx.stroke()
        }
    }

    static staticDraw(ctx, x, y, w, h, fillStyle) {
        ctx.fillStyle=fillStyle
        ctx.beginPath()
        ctx.rect(x, y, w, h);
        ctx.fill()
        ctx.stroke()
    }
}