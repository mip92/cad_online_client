import algebra, {Equation} from "algebra.js";


export class Crossing {
    lines=[]
    arr=[]
    constructor(lines, square) {
        this.lines = lines
        this.square = square
    }

    _area(a, b, c) {
        return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)
    }

    _intersect(a, b, c, d) {
        if (a > b) b = [a, a = b][0];
        if (c > d) d = [c, c = d][0];
        return Math.max(a, c) <= Math.min(b, d)
    }

    _getResultForOneLine(line, c, d) {
        return this._intersect(line.start.x, line.finish.x, c.x, d.x)
            && this._intersect(line.start.y, line.finish.y, c.y, d.y)
            && this._area(line.start, line.finish, c) * this._area(line.start, line.finish, d) <= 0
            && this._area(c, d, line.start) * this._area(c, d, line.finish) <= 0
    }
    getResultForSquare(line){
        let isCrossing=false
        this.square.arr.map(l=>{if (this._getResultForOneLine(line, l.start, l.finish)) isCrossing =true})
        return isCrossing
    }
    getResult(){
        this.lines.map(l=>this.getResultForSquare(l) && this.arr.push(l))
        return this.arr
    }
}


/*       var expr1 = algebra.parse(this.line.formula);
       var expr2 = algebra.parse(this.square.arr[1].formula);
       console.log(this.line.formula, this.square.arr[1].formula)
       var eq = new Equation(expr1, expr2);
       var xAnswer = eq.solveFor("x");
       var yAnswer = eq.solveFor("y");
       console.log("x = " + xAnswer.toString());
       console.log("y = " + yAnswer.toString());

       var x1 = algebra.parse(xAnswer.toString());
       var x2 = algebra.parse(this.square.arr[1].formula);

       var eq = new Equation(x1, x2);
       console.log(eq.toString());

       var answer = eq.solveFor("y");
       console.log("x = " + answer.toString());

   }*/

