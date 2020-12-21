const genRandom = () => (Math.floor(Math.random() * 4));

const buttons = document.querySelectorAll('.btn');
const title = document.getElementById('level-title');

let colorsState = [];
let buttonsState = [];

let isGameOver = false;

let currentBtn;
let level = 0;
let rand;

function clickButtonHandler() {
  addAndRemoveClass(this, 'pressed')
  buttonsState.push(this.getAttribute('id'));

  buttonsState.forEach((btn, i) => {
    if (btn !== colorsState[i]) {
      isGameOver = true;
    }
  });

  if (colorsState.length === buttonsState.length && !isGameOver) {
    ++level;
    genNewBtn();
  }

  if (isGameOver) {
    gameOver();
  }
}

const newGame = () => {
  isGameOver = false;
  window.addEventListener('keypress', keypressEvent);

  function keypressEvent() {
    startGame();

    window.removeEventListener('keypress', keypressEvent);
  }
};
newGame();

const addAndRemoveClass = (el, className, delay = 100) => {
  el.classList.add(className);
  setTimeout(() => {el.classList.remove(className);}, delay)
};

const gameOver = () => {
  title.innerHTML = 'Game over. Press a key to restart.';
  addAndRemoveClass(document.body, 'game-over');
  level = 0;

  colorsState = [];
  buttonsState = [];

  buttons.forEach(btn => {
    btn.removeEventListener('click', clickButtonHandler);
  });

  newGame();
};

const genNewBtn = () => {
  title.innerHTML = `Level ${level + 1}`;

  buttonsState = [];

  rand = genRandom();
  currentBtn = buttons[rand];

  setTimeout(() => {addAndRemoveClass(currentBtn, 'opacity', 510);}, 200)

  colorsState.push(currentBtn.getAttribute('id'));
};

const buttonsListeners = () => {
  buttons.forEach(btn => {
    btn.addEventListener('click', clickButtonHandler);
  });
};

const startGame = () => {
  genNewBtn();
  buttonsListeners();
};