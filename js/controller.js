import Polynome from "./polynome.js";

add.addEventListener('click', button_click);
multiply.addEventListener('click', button_click);


function button_click() {
    let p1 = new Polynome(first.value);
    let p2 = new Polynome(second.value);

    // operations
    switch (this) {
        case add: p1.add(p2);
            break;
        case multiply: p1.mult(p2);
            break;
    }

    fst.innerHTML = `\\( ${first.value} \\)`;
    snd.innerHTML = `\\( ${second.value} \\)`;
    result.innerHTML = `\\( ${p1.toText()} \\)`;
    MathJax.typeset();
}

