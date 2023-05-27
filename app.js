const H = 6.626e-34;
const C = 3e8;
const ME = 9.11e-31;
const MP = 1.67e-27;
const convertion = 1.602e-19;

function toScientificNotation(num) {
  const [coefficient, exponent] = num
    .toExponential()
    .split('e')
    .map((item) => Number(item));

  return `${coefficient.toFixed(2)} ∙ 10^${exponent.toFixed(0)}`;
}

function displayWaveFunction(L, n) {
  const parameter1 = toScientificNotation(Math.sqrt(2 / L));
  const parameter2 = toScientificNotation((n * Math.PI) / L);
  return `Ψ(x) = ${parameter1} sen(${parameter2} ∙ 𝑥)`;
}

function calcEnergyProton(L, n) {
  const E1Proton = Math.pow(H, 2) / (8 * MP * Math.pow(L, 2));
  return Math.pow(n, 2) * E1Proton;
}

function calcEnergyEletron(L, n) {
  const E1Eletron = Math.pow(H, 2) / (8 * ME * Math.pow(L, 2));
  return Math.pow(n, 2) * E1Eletron;
}

function calcDiffEnergy(final, inicial) {
  return Math.abs(final - inicial);
}

function calcWaveLength(energia) {
  return (H * C) / energia;
}

function calcFrequency(energia) {
  const lambda = calcWaveLength(energia);
  return C / lambda;
}

function calcVelocityEletron(energia) {
  return Math.sqrt((2 * energia) / ME);
}

function calcVelocityProton(energia) {
  return Math.sqrt((2 * energia) / MP);
}

function calcWaveLengthProton(energia) {
  const velocity = calcVelocityProton(energia);
  return H / (MP * velocity);
}

function calcWaveLengthEletron(energia) {
  const velocity = calcVelocityEletron(energia);
  return H / (ME * velocity);
}

function calcIntegral(n, x) {
  return (x - Math.sin(x) * Math.cos(x)) / (Math.PI * n);
}

function calcProbability(pos1, pos2, L, n) {
  const thetaInicial = calcTheta(L, n, pos1);
  const thetaFinal = calcTheta(L, n, pos2);
  const probability1 = calcIntegral(n, thetaInicial);
  const probability2 = calcIntegral(n, thetaFinal);

  return probability2 - probability1;
}

function calcTheta(L, n, pos) {
  console.log((n * Math.PI) / (L * 1e9));
  return ((n * Math.PI) / (L * 1e9)) * pos * 1e9;
}

document.querySelector('button').addEventListener('click', handleClick);

function handleClick() {
  document.querySelector('.container').style.display = 'none';
  document.getElementById('results').style.display = 'block';

  const particle = document.getElementById('particle').value;
  const isProton = particle === 'proton';
  const L = +document.getElementById('length').value;
  const ni = +document.getElementById('ni').value;
  const nf = +document.getElementById('nf').value;
  const a = +document.getElementById('a').value;
  const b = +document.getElementById('b').value;

  const waveFunction1El = document.createElement('p');
  const waveFunction2El = document.createElement('p');

  waveFunction1El.textContent = `ni: ${displayWaveFunction(L, ni)}`;
  waveFunction2El.textContent = `nf: ${displayWaveFunction(L, nf)}`;

  const energiaInicialEl = document.createElement('p');
  const energiaFinalEL = document.createElement('p');

  const energiaInicial = isProton
    ? calcEnergyProton(L, ni)
    : calcEnergyEletron(L, ni);
  const energiaFinal = isProton
    ? calcEnergyProton(L, nf)
    : calcEnergyEletron(L, nf);

  energiaInicialEl.textContent = `𝐸𝑖: ${toScientificNotation(
    energiaInicial
  )} J | ${toScientificNotation(energiaInicial / convertion)} eV`;
  energiaFinalEL.textContent = `𝐸𝑓: ${toScientificNotation(
    energiaFinal
  )} J | ${toScientificNotation(energiaFinal / convertion)} eV`;

  const energiaFoton = calcDiffEnergy(energiaFinal, energiaInicial);
  const frequenciaFoton = calcFrequency(energiaFoton);
  const comprimentoFoton = calcWaveLength(energiaFoton);

  const fotonEl = document.createElement('p');
  fotonEl.textContent = `𝐸𝑓ó𝑡𝑜𝑛: ${toScientificNotation(
    energiaFoton / convertion
  )} eV | 𝑓: ${toScientificNotation(
    frequenciaFoton
  )} Hz | 𝜆: ${toScientificNotation(comprimentoFoton)} m`;

  const velocidadeInicial = isProton
    ? calcVelocityProton(energiaInicial)
    : calcVelocityEletron(energiaInicial);

  const velocidadeFinal = isProton
    ? calcVelocityProton(energiaFinal)
    : calcVelocityEletron(energiaFinal);

  const velocidadeInicialEl = document.createElement('p');
  const velocidadeFinalEl = document.createElement('p');

  velocidadeInicialEl.textContent = `𝑣𝑖: ${velocidadeInicial.toExponential(
    3
  )} m/s`;

  velocidadeFinalEl.textContent = `𝑣𝑓: ${velocidadeFinal.toExponential(3)} m/s`;

  const comprimentoInicial = isProton
    ? calcWaveLengthProton(energiaInicial)
    : calcWaveLengthEletron(energiaInicial);

  const comprimentoFinal = isProton
    ? calcWaveLengthProton(energiaFinal)
    : calcWaveLengthEletron(energiaFinal);

  const comprimentoInicialEl = document.createElement('p');
  const comprimentoFinalEl = document.createElement('p');

  comprimentoInicialEl.textContent = `𝜆n𝑖: ${toScientificNotation(
    comprimentoInicial
  )} m`;
  comprimentoFinalEl.textContent = `𝜆n𝑓: ${toScientificNotation(
    comprimentoFinal
  )} m`;

  const prababilidadeInicial = (calcProbability(a, b, L, ni) * 100).toFixed(1);
  const prababilidadeFinal = (calcProbability(a, b, L, nf) * 100).toFixed(1);

  const probabilidadeInicialEl = document.createElement('p');
  const probabilidadeFinalEl = document.createElement('p');

  probabilidadeInicialEl.textContent = `n𝑖: P(X) = ${prababilidadeInicial}%`;
  probabilidadeFinalEl.textContent = `n𝑓: P(X) = ${prababilidadeFinal}%`;

  const returnButton = document.createElement('button');
  returnButton.textContent = 'Voltar';

  const container = document.getElementById('results');
  container.appendChild(waveFunction1El);
  container.appendChild(waveFunction2El);
  container.appendChild(energiaInicialEl);
  container.appendChild(energiaFinalEL);
  container.appendChild(fotonEl);
  container.appendChild(velocidadeInicialEl);
  container.appendChild(velocidadeFinalEl);
  container.appendChild(comprimentoInicialEl);
  container.appendChild(comprimentoFinalEl);
  container.appendChild(probabilidadeInicialEl);
  container.appendChild(probabilidadeFinalEl);
  container.appendChild(returnButton);

  returnButton.addEventListener('click', () => location.reload());
}
