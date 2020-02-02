
/**
 * @param  {...string} selectors 
 * @returns {Element}
 */
function getElements(...selectors) {
  return selectors.map(sel => document.querySelector(sel));
}

/** @type {HTMLDivElement[]} */
var [
  scoreEl, highScoreEl, incScoreEl, finishGameEl
] = getElements(
  '.score',
  '.high-score',
  '.inc-score',
  '.finish-game',
);

var highScore = parseInt(localStorage.getItem("high-score")) || 0;
var score = 0;

function draw() {
  highScoreEl.innerText = `High score: ${highScore}`;
  scoreEl.innerText = `Score: ${score}`;
}

draw();

incScoreEl.onclick = e => {
  score++;
  draw();
};

finishGameEl.onclick = e => {
  highScore = Math.max(score, highScore);
  localStorage.setItem("high-score", highScore);
  score = 0;
  draw();
};
