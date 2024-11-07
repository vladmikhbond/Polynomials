
// 4x^5+10x^4-2x^3+10x^2+25x-5 
// ---------------------------- = 2x^3+5
// 2x^2+5x-1
//

export default class Convert 
{

    // Переводить багаточлен у внутрішню форму - масив чисел.
    // '2x^2+5x-1' => [-1, 5, 2]
    //
    static toInner(outer) {
        let pairs = Convert.poly2monos(outer)
                .map(mono => Convert.mono2pair(mono));
        pairs.sort((a, b) => a.p - b.p);
        let maxIndex = pairs[pairs.length - 1].p;

        let result = new Array(maxIndex + 1).fill(0);
        pairs.forEach(pair => result[pair.p] += pair.m);
        return result;
    }


    static toOuter(inner) {
        let res = inner.map((m, p) => Convert.pair2mono(m, p)).reverse().join('');
        if (res[0] == '+') res = res.slice(1);
// console.log(inner, res)                 
        return res;
    }

    static pair2mono(m, p) {
        if (m === 0) return '';
        if (m > 0) m = '+' + m;
        if (m == '+1' && p != 0) m = '+';
        if (m == '-1' && p != 0) m = '-';
        if (p == 0) return `${m}`;  
        if (p == 1) return `${m}x`;  
        return `${m}x^${p}`
    }


    // Розділяє багаточлен на одночлени.
    // '2x^2+5x-1' => ['+2x^2', '+5x', '-1']
    //
    static poly2monos(poly) {
        poly = poly.trim();
        
        let polyArr = [];
        let mono = '';
        for (let char of poly) {
            if (char == '+' || char == '-') {
                polyArr.push(mono);
                mono = char;
            } else {
                mono += char;
            }
        }
        polyArr.push(mono);
        
        if (polyArr[0] == '')
            polyArr.shift();
        return polyArr;
    }

    // Переводить одночлен у пару чисел {m, p}
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

}

//---------------------- tests ---------------------------
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



//---------------------- tests ---------------------------
// console.log(Convert.toArray('2x^2+5x-1'));
// console.log(Convert.toArray('4x^5+x^4-2x^3+10x^2+25x+25x-5'));
// console.log(Convert.toArray('1'));
// console.log(Convert.toArray('+1'));
// console.log(Convert.toArray('-1'));

// console.log(Convert.toText([-1, 5, 2]));
// console.log(Convert.toText([-5, 50, 10, -2, 1, 4]));




