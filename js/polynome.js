import Convert from "./convert.js";
import Arr from "./arr.js";

export default class Polynome 
{
    constructor(text) {
        this.arr = Convert.toInner(text);
    }
    
    // this += other
    add(other) {
        this.arr = Arr.plus(this.arr, other.arr);
    }

    // this *= other
    mult(other) {
        this.arr = Arr.star(this.arr, other.arr);
    }
    
    toText() {
        return Convert.toOuter(this.arr);
    }
}


//---------------------- tests ---------------------------
// let a = new Polynome('2x^2+5x-1'), b = new Polynome('2x^3+5');
// a.mult(b);
// console.log(a.toText());  // 4x^5+10x^4-2x^3+10x^2+25x-5