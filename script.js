const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('site'));

app.use(express.json());


app.post('/save-name', (req, res) => {
    const name = req.body.name;
    fs.appendFile('name.txt', name + '\n', err => {
        if (err) throw err;
        console.log('Saved!');
    });
    res.send({ status: 'OK' });
});

app.listen(3000, () => console.log('Server started on port 3000'));

let expression = '';

function appendNumber(number) {
  expression += number;
  document.getElementById('result').value = expression;
}

function appendOperator(operator) {
  expression += operator;
  document.getElementById('result').value = expression;
}

function clearResult() {
  expression = '';
  document.getElementById('result').value = '';
}

function calculate() {
  try {
    calculateIntegral(expression);
  } catch (error) {
    document.getElementById('result').value = 'Error';
  }
}

function evaluateBorwein(n, x) {
    let somme = 1;
    if (x === 0) return 1;
    for (let i = 0; i <= n; i++) {
        const den1 = (2 * i) + 1;
        const den2 = x / den1;
        somme *= Math.sin(den2) / den2;
    }
    return somme;
}

function midpoint(a, b, n) {
    const c = b - a;
    return c * evaluateBorwein(n, (a + b) / 2);
}

function trapezoid(a, b, n) {
    const c = (b - a) / 2;
    const m = evaluateBorwein(n, a);
    const nValue = evaluateBorwein(n, b);
    const o = m + nValue;
    return c * o;
}

function simpson(a, b, n) {
    const c = (b - a) / 6;
    const d = evaluateBorwein(n, a);
    const e = 4 * evaluateBorwein(n, (a + b) / 2);
    const f = evaluateBorwein(n, b);
    const o = d + e + f;
    return c * o;
}

function forMidpoint(n) {
    let a = 0;
    let b = 0.5;
    let somme = 0;

    while (b <= 5000) {
        somme += midpoint(a, b, n);
        a = b;
        b += 0.5;
    }
    const liste = [somme, Math.abs(somme - (Math.PI / 2))];
    return liste;
}

function forTrapezoid(n) {
    let a = 0;
    let b = 0.5;
    let somme = 0;

    while (b <= 5000) {
        somme += trapezoid(a, b, n);
        a = b;
        b += 0.5;
    }
    const liste = [somme, Math.abs(somme - (Math.PI / 2))];
    return liste;
}

function forSimpson(n) {
    let a = 0;
    let b = 0.5;
    let somme = 0;

    while (b <= 5000) {
        somme += simpson(a, b, n);
        a = b;
        b += 0.5;
    }
    const liste = [somme, Math.abs(somme - (Math.PI / 2))];
    return liste;
}

function calculateIntegral(inputValue) {
    let n;
    try {
        n = parseInt(inputValue);
        if (isNaN(n) || n < 0) throw "Invalid input";
    } catch (error) {
        console.error("Invalid input:", error);
        return;
    }
    const liste1 = forMidpoint(n);
    const liste2 = forTrapezoid(n);
    const liste3 = forSimpson(n);
    
    let result = `Midpoint:\n`;
    result += ` I${n} = ${liste1[0].toFixed(10)}\n`;
    result += ` diff = ${liste1[1].toFixed(10)}\n`;
    result += `\n`;
    result += ` Trapezoidal:\n`;
    result += ` I${n} = ${liste2[0].toFixed(10)}\n`;
    result += ` diff = ${liste2[1].toFixed(10)}\n`;
    result += `\n`;
    result += ` Simpson:\n`;
    result += ` I${n} = ${liste3[0].toFixed(10)}\n`;
    result += ` diff = ${liste3[1].toFixed(10)}`;

    document.getElementById('result').value = result;

}

