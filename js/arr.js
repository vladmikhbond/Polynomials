export default class Arr {
    // c = a + b
    static plus(a, b) {
        let c = [];
        let n = Math.max(a.length, b.length);
        for (let i = 0; i < n; i++) {
            c.push((a[i] ?? 0) + (b[i] ?? 0));
        }
        return c;
    }
    
    // c = a * b
    static star(a, b) {
        let c = [];
        for (let p = 0; p < b.length; p++) {
            let m = b[p];
            let d = (new Array(p).fill(0)).concat(a.map(x => x * m));
            c = Arr.plus(c, d);
        }
        return c;
    }

}

//---------------------- tests ---------------------------
console.log(Arr.plus([1,2,3], [1, 1]));
console.log(Arr.star([1,2,3], [1]));  // [1, 3, 5, 3]
