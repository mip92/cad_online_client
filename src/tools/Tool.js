import {SquareObject} from "./squareObject";
import {Crossing} from "../utils/crossing";
import {LineObject} from "./LineObject";
import {DotObject} from "./dotObject";

export default class Tool{
    constructor(canvas,socket,id) {
        this.canvas=canvas
        this.socket=socket
        this.id=id
        this.ctx=canvas.getContext('2d')
       /* this.ctx.beginPath();
        this.ctx.rect(50, 0, 75, 150);
        this.ctx.stroke();
        let line12=new LineObject(new DotObject(50,0),new DotObject(50,75))
        let line23=new LineObject(new DotObject(50,75), new DotObject(50,75))
        let line34=new LineObject(new DotObject(150,75), new DotObject(150,0))
        let line41=new LineObject(new DotObject(150,0), new DotObject(50,0))
        this.square=new SquareObject(line12,line23, line34,line41)*/
       /* this.ctx.beginPath();       // Start a new path
        this.ctx.moveTo(0, 25);    // Move the pen to (30, 50)
        this.ctx.lineTo(150, 75);  // Draw a line to (150, 100)
        this.ctx.stroke();
        this.line=new LineObject(new DotObject(0,25),new DotObject(150,75))*/
       // console.log(this.square.arr)
       /* this.crossing =new Crossing(this.line, this.square)
        this.crossing.getResultForSquare()*/
        this.destroyEvents()
    }

    set fillColor(color){
        this.ctx.fillStyle=color
    }

    set strokeColor(color){
        this.ctx.strokeStyle=color
    }

   set lineWidth(width){

        this.ctx.lineWidth=width
    }


    destroyEvents(){
        this.canvas.onmousemove=null
        this.canvas.onmousedown=null
        this.canvas.onmouseup=null
    }
}