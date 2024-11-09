
// 4x^5+10x^4-2x^3+10x^2+25x-5 
// ---------------------------- = 2x^3+5
// 2x^2+5x-1
//

export default class Convert 
{
//#region toInner
      
    // Переводить багаточлен із зовнішній форми у внутрішню - в словник.
    // '2x^-2+5x-1' => {"-2":2, "1":5, "0":-1}
    //
    static outerToInner(outer) {
        let pairs = Convert.poly2monos(outer)
                .map(mono => Convert.mono2pair(mono));
        const res = {}        
        for (let pair of pairs) {
            if (res[pair.p])
                res[pair.p] += pair.m;
            else 
                res[pair.p] = pair.m;
        }  
        return res;
    }

    // Розділяє багаточлен на масив одночленів.
    // '2x^2+5x-1' => ['+2x^2', '+5x', '-1']
    //
    static poly2monos(poly) {
        poly = poly.trim();
        
        let monos = [];
        let mono = '';
        for (let i = 0; i < poly.length; i++) {
            let char = poly[i], preChar = poly[i - 1];    
            if ((char == '+' || char == '-') && preChar != '^') {
                monos.push(mono);
                mono = char;
            } else {
                mono += char;
            }
        }
        monos.push(mono);
        
        if (monos[0] == '')
            monos.shift();
        return monos;
    }


    // Переводить одночлен у об'єкт {m, p} - m мантиса, p порядок
    //
    static mono2pair(mo, x = 'x') {
        mo = mo.replace('^', '').replace('+', '').replace(/\s+/g, '');
        if (mo[0] == '+') mo.shift()

        // 33  -33  
        if (!mo.includes(x)) 
            return {m: +mo, p: 0}

        let [m, p] = mo.split(x);
        m = m === '' ? 1 : (m==='-' ? -1 : +m);
        p = p === '' ? 1 : +p;
        return {m:m, p:p};  
    }

//#endregion

//#region toOuter

    // Переводить багаточлен із внутрішньої форми у зовнішню.
    // {"-2":2, "1":5, "0":-1} => '2x^-2+5x-1'
    //
    static innerToOuter(inner, tex=false) {
        let keys = Object.keys(inner).sort((a, b) => b - a);
        let res = '';
        for (let key of keys) {
           res = res + Convert.pair2mono(inner[key], key, tex);
        }
        if (res[0] == '+') res = res.slice(1);                
        return res;
    }

    // Переводить мантису і порядок  (m, p) у одночлен.
    // 
    static pair2mono(m, p, tex=false) {
        if (m === 0) return '';
        if (m > 0) m = '+' + m;
        if (m == '+1' && p != 0) m = '+';
        if (m == '-1' && p != 0) m = '-';
        if (p == 0) return `${m}`;  
        if (p == 1) return `${m}x`; 
        if (tex && p < 0) p = '{' + p + '}';
        return `${m}x^${p}`
    }

//#endregion

    static outerToTex(outer) {
        return '\\(' + this.innerToOuter(this.outerToInner(outer), true) + '\\)';
    }
}

//---------------------- tests ---------------------------
//console.log(Convert.pair2mono(22, -33));       // '22x^-33'



//---------------------- tests ---------------------------
// console.log(Convert.poly2monos('2x^-2+5x-1')); // 2x^-2  +5x   -1
// console.log(Convert.poly2monos('2x^2+5x-1'));  // 2x^2  +5x   -1
// console.log(Convert.poly2monos('-x^2+5x-1'));  // -x^2  +5x   -1
// console.log(Convert.poly2monos('3'));          // 3
// console.log(Convert.poly2monos('-3'));         // -3
// console.log(Convert.poly2monos(''));           // []



//---------------------- tests ---------------------------
// console.log(Convert.mono2pair('-33'));       // {m: -33, p: 0}
// console.log(Convert.mono2pair('33'));        // {m: 33, p: 0}
// console.log(Convert.mono2pair('+x^33'));     // {m: 1, p: 33}
// console.log(Convert.mono2pair('-x^33'));     // {m: -1, p: 33}
// console.log(Convert.mono2pair('x^33'));      // {m: 1, p: 33}
// console.log(Convert.mono2pair('+22x'));      // {m: 22, p: 1}
// console.log(Convert.mono2pair('+22x^33'));   // {m: 22, p: 33}
// console.log(Convert.mono2pair('22x^33'));    // {m: 22, p: 33}
// console.log(Convert.mono2pair('22x^-33'));    // {m: 22, p: -33}



//---------------------- tests ---------------------------
// console.log(Convert.toInner('2x^-2+5x-1'));
// console.log(Convert.toInner('2x^2+5x-1'));
// console.log(Convert.toInner('4x^5+x^4-2x^3+10x^2+25x+25x-5'));
// console.log(Convert.toInner('1'));
// console.log(Convert.toInner('+1'));
// console.log(Convert.toInner('-1'));

// console.log(Convert.toOuter({0: -1, 1: 5, "-2": 2}));
// console.log(Convert.toOuter([-5, 50, 10, -2, 1, 4]));




