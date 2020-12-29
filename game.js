let gamePattern = [];
let userPattern = [];
let gameStarted = false;
let level = 1;
const btns = document.querySelectorAll(".btn");
const buttonColors = ["red", "blue", "green", "yellow"];

//  handle click on butten
btns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    // clicked color is saved under variable
    const userChosenColor = e.target.id;
    // the variable is pushed to the user pattern
    userPattern.push(userChosenColor);

    playSound(userChosenColor);

    // add and remove pressed class with 100 milisecond delay
    document.querySelector("#" + userChosenColor).classList.add("pressed");
    setTimeout(
      () =>
        document
          .querySelector("#" + userChosenColor)
          .classList.remove("pressed"),
      100
    );

    checkAnswer(userPattern.length);
  })
);

let nextSequence = () => {
  // generate random number between 0 - 3
  const randomNumber = Math.floor(Math.random() * 4);
  // use the random number to pick random color from array
  randomChosenColor = buttonColors[randomNumber];
  // push the random color to game pattern
  gamePattern.push(randomChosenColor);

  const selected = document.querySelector("#" + randomChosenColor);

  // change the title to show current level
  document.querySelector("#level-title").innerHTML = "level " + level;

  blip(selected);
  playSound(randomChosenColor);
  level++;
  userPattern = [];
};

// FUNCTIONS
const blip = (element) => {
  element.classList.add("blip");
  element.addEventListener("animationend", () =>
    element.classList.remove("blip")
  );
};

const playSound = (name) => {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
};

const checkAnswer = (answer) => {
  if (userPattern[answer - 1] === gamePattern[answer - 1]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(() => nextSequence(), 700);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    document.querySelector("body").classList.add("game-over");
    setTimeout(
      () => document.querySelector("body").classList.remove("game-over"),
      200
    );
    document.querySelector("#level-title").innerHTML =
      "Game Over! Press any key";
    startOver();
  }
};

const startOver = () => {
  userPattern = [];
  gamePattern = [];
  level = 1;
  gameStarted = false;
};

const startGame = () => {
  document.addEventListener("keyup", () => {
    if (gameStarted === false) {
      nextSequence();
    }

    gameStarted = true;
  });
};

startGame();
