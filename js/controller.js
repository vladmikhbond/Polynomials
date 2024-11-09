import Polynome from "./polynome.js";
import Convert from "./convert.js";

add.addEventListener('click', button_click);
multiply.addEventListener('click', button_click);


function button_click() {
    let poly1 = new Polynome(first.value);
    let poly2 = new Polynome(second.value);

    // operations
    switch (this) {
        case add: poly1.add(poly2);
            break;
        case multiply: poly1.mult(poly2);
            break;
    }

    firstTex.innerHTML = Convert.outerToTex(first.value);
    secondTex.innerHTML = Convert.outerToTex(second.value);
    resultTex.innerHTML = poly1.toTex();
    MathJax.typeset();
}

