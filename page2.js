document.querySelector('button').addEventListener('click', handleClick);

function toScientificNotation(num) {
  const [coefficient, exponent] = num
    .toExponential()
    .split('e')
    .map((item) => Number(item));

  return `${coefficient.toFixed(2)} ∙ 10^${exponent.toFixed(0)}`;
}

function firstDigit(num) {
  const len = String(Math.abs(num)).length;
  const divisor = 10 ** (len - 1);
  return Math.round(num / divisor);
}

function calcularLargura(x) {
  return (2 / Math.pow(x, 2)) * 1e9;
}

function calcularNivel(x, largura) {
  return (x * largura) / Math.PI;
}

function calcProbabilidade(A, k, Xp) {
  console.log(A, k, Xp);
  const largura = calcularLargura(A);
  const a = Math.pow(Math.sin(k * largura * Xp * 1e-9), 2);
  return Math.pow(A, 2) * a;
}

function handleClick() {
  document.querySelector('.container').style.display = 'none';
  document.getElementById('results').style.display = 'block';

  const A = +document.getElementById('A').value;
  const k = +document.getElementById('k').value;
  const Xp = +document.getElementById('xp').value;

  const largura = calcularLargura(A);
  const larguraEl = document.createElement('p');
  larguraEl.textContent = `L: ${toScientificNotation(largura)} nm`;

  const nivel = calcularNivel(k, largura);
  const nivelEl = document.createElement('p');
  nivelEl.textContent = `n: ${firstDigit(nivel.toFixed(0))}`;

  const probabilidade = calcProbabilidade(A, k, Xp);
  const probabilidadeEl = document.createElement('p');
  probabilidadeEl.textContent = `P(X) = ${probabilidade.toFixed(0)}`;

  const returnButton = document.createElement('button');
  returnButton.textContent = 'Voltar';

  const container = document.getElementById('results');
  container.appendChild(larguraEl);
  container.appendChild(nivelEl);
  container.appendChild(probabilidadeEl);
  container.appendChild(returnButton);
  returnButton.addEventListener('click', () => location.reload());
}
