const generateRandom = () => Math.floor(Math.random() * 4);

const container = document.querySelector(".container");
const buttons = document.querySelectorAll(".btn");
const title = document.getElementById("level-title");

let colorsState = [];
let buttonsState = [];

let isGameOver = false;

let currentBtn;
let level = 0;
let random;


function clickContainerHandler(e) {
  if (e.target.tagName === "DIV" && e.target.classList.contains("btn")) {
    const button = e.target;

    toggleClass(button, "pressed");
    buttonsState.push(button.getAttribute("id"));

    buttonsState.forEach((btn, i) => {
      if (btn !== colorsState[i]) {
        isGameOver = true;
      }
    });

    if (colorsState.length === buttonsState.length && !isGameOver) {
      ++level;
      generateNewButton();
    }

    if (isGameOver) {
      gameOver();
    }
  }
}

const newGame = () => {
  isGameOver = false;
  window.addEventListener("keypress", keypressEvent);

  function keypressEvent() {
    startGame();

    window.removeEventListener("keypress", keypressEvent);
  }
};
newGame();
const toggleClass = (el, className, delay = 100) => {
  el.classList.add(className);
  setTimeout(() => {
    el.classList.remove(className);
  }, delay);
};

const gameOver = () => {
  title.innerHTML = "Game over. Press a key to restart.";
  toggleClass(document.body, "game-over");
  level = 0;

  colorsState = [];
  buttonsState = [];

  container && container.removeEventListener("click", clickContainerHandler);

  newGame();
};

const generateNewButton = () => {
  title.innerHTML = `Level ${level + 1}`;

  buttonsState = [];

  random = generateRandom();
  currentBtn = buttons[random];

  setTimeout(() => {
    toggleClass(currentBtn, "opacity", 510);
  }, 200);

  colorsState.push(currentBtn.getAttribute("id"));
};

const startGame = () => {
  generateNewButton();
  container && container.addEventListener("click", clickContainerHandler);
};
