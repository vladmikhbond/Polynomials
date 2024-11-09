export default class Operators {
    // c = a + b
    static plus(a, b) {
        let c = Object.assign({}, a);
        for (let key in b) {
            if (c[key]) {
                c[key] += b[key];
            } else {
                c[key] = b[key];
            }
            if (c[key] === 0) delete c[key];
        }
        return c;
    }
    
    // b = a * {m, p}
    static star1(a, m, p) {
        let b = {};
        for (let key in a) {
            b[+key + +p] = a[key] * m;
        }
        return b;
    }

    // c = a * b
    static star(a, b) {
        let c = {};
        for (let key in b) {
            let a1 = this.star1(a, b[key], key)
            c = Operators.plus(a1, c);
            // console.log(1111);
        }
        return c;
    }

}

//---------------------- tests ---------------------------
// console.log(Arr.plus({0: -1, 1: 5, "-2": 2}, {0: 1, 1: 1}));     // {0: 0, 1: 6, -2: 4}

// console.log(Arr.star1({0: -1, 1: 5, "-2": 2}, 1, 0));            // {0: -1, 1: 5, -2: 2}
// console.log(Arr.star({0: -1, 1: 5, "-2": 2}, {0: 1}));           // {0: -1, 1: 5, -2: 2}
// console.log(Arr.star({0: -1, 1: 5, "-2": 2}, {1: 1, 0: 1}));     // {0: -1, 1: 4, -2: 2, 2: 5, -1: 2}
 