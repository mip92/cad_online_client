import {DotObject} from "./dotObject";
import {Objects} from "./Objects";

export class LineObject {
    constructor(start, finish, ctx) {
        this.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        this.start = start
        this.finish = finish
        this.figureName = 'line'
        this.isSelected = false
        this.ctx=ctx
    }

    set selectedLine(isSelected) {
        this.isSelected = isSelected
        this.ctx.fillStyle='blue'
    }

    /*    set setFinish({startX, startY, finishX, finishY}) {
            this.start = new DotObject(startX, startY)
            this.finish = new DotObject(finishX, finishY)
            this.formula = this.crateFormula()
        }*/

    crateFormula() {
        if (this.start.x === this.finish.x) {
            return `x-${this.finish.x}`
        } else if (this.start.y === this.finish.y) return `y-${this.finish.y}`
        else return `(y-${this.start.y})/(${this.finish.y}-${this.start.y})-(x-${this.start.y})/(${this.finish.y}-${this.start.y})`
    }
}