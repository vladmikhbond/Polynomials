import Convert from "./convert.js";
import Operators from "./operators.js";

export default class Polynome 
{
    constructor(text) {
        this.arr = Convert.outerToInner(text);
    }
    
    // this += other
    add(other) {
        this.arr = Operators.plus(this.arr, other.arr);
    }

    // this *= other
    mult(other) {
        this.arr = Operators.star(this.arr, other.arr);
    }
    
    toTex() {
        return '\\(' + Convert.innerToOuter(this.arr, true) + '\\)';
    }
}


//---------------------- tests ---------------------------
// let a = new Polynome('2x^2+5x-1'), b = new Polynome('2x^3+5');
// a.mult(b);
// console.log(a.toText());  // 4x^5+10x^4-2x^3+10x^2+25x-5