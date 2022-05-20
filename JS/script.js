const playerOne = document.getElementById("playerone");
const playerTwo = document.getElementById("playertwo");
const elementsArr = Array.from(document.querySelectorAll(".game-board > div"));
const positions = {};
const snakes = {
  one: {
    from: 46,
    to: 5,
  },
  two: {
    from: 63,
    to: 43,
  },
  three: {
    from: 82,
    to: 60,
  },
  four: {
    from: 96,
    to: 57,
  },
};

const ladders = {
  one: {
    from: 4,
    to: 45,
  },
  two: {
    from: 27,
    to: 53,
  },
  three: {
    from: 23,
    to: 44,
  },
};

window.onload= ()=>{
 
 window.innerWidth < 1000 ? console.log('sdfjsd'):null
}
const who = document.querySelector(".turn");
const dice = document.querySelector(".dice");
const normaldiceaudio = new Audio("/Assets/RATTLE2.wav");
const six = new Audio("/Assets/6.mp3");
let num;
let playeroneposition = 1;
let playertwoposition = 1;
let turn = "player one";
elementsArr.forEach((elem, index, arr) => {
  positions[elem.classList[0]] = elem.getBoundingClientRect();
});

dice.addEventListener("click", () => {
  normaldiceaudio.play();
  setTimeout(() => {
    num = Math.floor(Math.random() * 6 + 1);

    dice.textContent = num;
    flipplayer();
    move(turn, num);
  }, 300);
});

function flipplayer() {
  turn == "player one" ? (turn = "player two") : (turn = "player one");
  who.innerText = `${turn}'s  turn Roll the dice`;
}

function move(turn, num) {
  if (
    num === 6 &&
    turn === "player one" &&
    playerOne.classList.contains("hidden")
  ) {
    playerOne.classList.toggle("hidden");
    playeroneposition++;
    return;
  } else if (num === 6 && playerTwo.classList.contains("hidden")) {
    playerTwo.classList.toggle("hidden");
    playertwoposition++;
    return;
  }
  if (turn == "player one" && playeroneposition + num > 100) {
    turn = "player two";
    return;
  } else if (turn == "player two" && playertwoposition + num > 100) {
    turn = "player one";
    return;
  }

  if (turn == "player one" && playeroneposition) {
    playeroneposition += num;

    if (playeroneposition < 50) {
      playerOne.style.top = `${
        1000 - Math.ceil(playeroneposition / 10) * 85
      }px`;
    } else {
      playerOne.style.top = `${
        1000 - Math.ceil(playeroneposition / 10) * 95
      }px`;
    }

    playerOne.style.left = `${positions[`num${playeroneposition}`].x}px`;
  } else if (turn == "player two" && playertwoposition) {
    playertwoposition += num;
    if (playeroneposition < 50) {
      playerTwo.style.top = `${
        1000 - Math.ceil(playertwoposition / 10) * 85
      }px`;
    } else {
      playerTwo.style.top = `${
        1000 - Math.ceil(playertwoposition / 10) * 95
      }px`;
    }
  }
  playerTwo.style.left = `${positions[`num${playertwoposition}`].x}px`;

  setTimeout(() => {
    isSnake(turn);
    isLadder(turn);
  }, 400);

  isWinner(turn);
}

function isSnake(turn) {
  for (let snake in snakes) {
    playeroneposition == snakes[snake].from
      ? eatenorclimb(turn, snakes[snake].to)
      : playertwoposition == snakes[snake].from
      ? eatenorclimb(turn, snakes[snake].to)
      : null;
  }
}

function eatenorclimb(player, goto) {
  six.play()
  if (player === "player one") {
    playeroneposition = goto;
    if (playeroneposition < 50) {
      playerOne.style.top = `${1000 - Math.ceil(goto / 10) * 85}px`;
    } else {
      playerOne.style.top = `${1000 - Math.ceil(goto / 10) * 95}px`;
    }

    playerOne.style.left = `${positions[`num${goto}`].x}px`;
  } else {
    playertwoposition = goto;
    if (playertwoposition < 50) {
      playerTwo.style.top = `${1000 - Math.ceil(goto / 10) * 85}px`;
    } else {
      playerTwo.style.top = `${1000 - Math.ceil(goto / 10) * 95}px`;
    }

    playerTwo.style.left = `${positions[`num${goto}`].x}px`;
  }
}

function isLadder(turn) {
  for (let ladder in ladders) {
    playeroneposition == ladders[ladder].from
      ? eatenorclimb(turn, ladders[ladder].to)
      : playertwoposition == ladders[ladder].from
      ? eatenorclimb(turn, ladders[ladder].to)
      : null;
  }
}

function isWinner(turn) {
  if (turn == "player one" && playeroneposition == 100) {

    setTimeout(()=>{let winnderdiv = document.createElement('div');
    winnderdiv.style.height= "100vh";
    winnderdiv.style.width = "100vw";
    winnderdiv.style.background = "white"
    winnderdiv.style.position ="absolute"
    winnderdiv.style.zIndex="20"
    winnderdiv.style.textAlign="center"
    winnderdiv.textContent= `Player One Won the game`
    winnderdiv.style.inset="0"
    document.body.appendChild(winnderdiv)} , 400)

  } else if (turn == "player two" && playertwoposition == 100) {

    setTimeout(()=>{let winnderdiv = document.createElement('div');
    winnderdiv.style.height= "100vh";
    winnderdiv.style.width = "100vw";
    winnderdiv.style.background = "white"
    winnderdiv.style.position ="absolute"
    winnderdiv.style.zIndex="20"
    winnderdiv.style.textAlign="center"
    winnderdiv.textContent= `Player Two Won the game`
    winnderdiv.style.inset="0"
    document.body.appendChild(winnderdiv)} , 400)
  }
}
