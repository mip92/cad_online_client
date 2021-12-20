export class Objects {
    //lines;
    static rects=[];
    static lines=[];

    constructor(objects) {
        this.objects = objects
    }
/*

    set setObject(obj) {

    }
*/
    static setObject(obj) {
        switch (obj.figureName) {
            case "line":
                this.lines.push(obj)
                break
            case  'rect':
                this.rects.push(obj)
                break
        }
    }
    static getObjects(){
        return this.lines
    }
}
export default new Objects()