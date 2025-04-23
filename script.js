
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }
    } else {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDarkScheme.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.checked = true;
            localStorage.setItem('theme', 'dark');
        }
    }
    
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
    
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav-links li');
    
    navLinks.forEach(link => {
        const linkHref = link.querySelector('a').getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.closest('.code-container').querySelector('code');
            const textArea = document.createElement('textarea');
            textArea.value = codeBlock.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        });
    });
});

// Code pour la calculatrice Borwein
let expression = '';

function appendNumber(number) {
  expression += number;
  document.getElementById('result').value = expression;
}

function clearResult() {
  expression = '';
  document.getElementById('result').value = '';
}

function calculate() {
  try {
    if (expression === '') {
      document.getElementById('result').value = 'Veuillez entrer un nombre';
      return;
    }
    
    const n = parseInt(expression);
    
    if (isNaN(n) || n < 0) {
      document.getElementById('result').value = 'Veuillez entrer un nombre entier positif';
      return;
    }
    
    calculateIntegral(n);
  } catch (error) {
    document.getElementById('result').value = 'Erreur: ' + error.message;
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

function calculateIntegral(n) {
  document.getElementById('result').value = "Calcul en cours...";
  
  setTimeout(() => {
    try {
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
    } catch (error) {
      document.getElementById('result').value = 'Erreur: ' + error.message;
    }
  }, 100);
}
