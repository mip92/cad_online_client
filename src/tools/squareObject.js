import {LineObject} from "./LineObject";

export class SquareObject {
    constructor(line12, line23, line34, line41) {
        this.line12 = line12
        this.line23 = line23
        this.line34 = line34
        this.line41 = line41
        this.arr = [this.line12, this.line23, this.line34, this.line41]
    }
}