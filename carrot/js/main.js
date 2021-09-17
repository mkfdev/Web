import Popup from "./popup.js";
import * as sound from "./sound.js";

const gamePopup = new Popup();

const CARROT_COUNT = 10; //Immutable
const BUG_COUNT = 10;
const GAME_TIME = 10;
const CARROT_SIZE = 80;

let isPlaying = false;
let score = 0; // CLICK SCORE
let timer = undefined;
const gameBtn = document.querySelector('.carrotCatch-record__btn');
const playBtn = document.querySelector('.fa-play');
const playTimer = document.querySelector('.timer');
const gameField = document.querySelector('.carrotCatch-game');
const gameCount = document.querySelector('.count');

gamePopup.setClickListener(() => {
  gamePopup.hide();
  startGame();
});

playBtn.addEventListener('click', () => {
  if(isPlaying) {
    stopGame();
  } else {
    startGame();
  }
});

gameField.addEventListener('click', event => {
  if(!isPlaying) return;

  // 당근이미지 클릭시
  if(event.target.classList.contains('carrot')) {
    event.target.remove();
    sound.carrostSoundPlay();

    //스코어
    score++;
    gameCount.innerText = CARROT_COUNT - score;

    if(score === CARROT_COUNT) {
      sound.winSoundPlay();
      pauseGame();
      //팝업노출 - 승 게임종료
      gamePopup.showWithText('WON!!');
    }
  } else if (event.target.className === 'bug') {
    sound.bugSoundPlay();
    pauseGame();
    //팝업노출 - 패 게임종료
    gamePopup.showWithText('LOSE!');
  }
});

function startGame() {
  isPlaying = true;
  initField();
  showGameStopBtn();
  startGameTimer();
  sound.bgSoundPlay();
}

function stopGame() {
  pauseGame();
  gamePopup.showWithText('RePlay?');
  sound.alertSoundPlay();
}

function hideGameBtn() {
  gameBtn.style.visibility = 'hidden';
}

function showGameStopBtn() {
  const buttonIcon = gameBtn.querySelector('.fas');
  buttonIcon.classList.add('fa-stop');
  buttonIcon.classList.remove('fa-play');
  gameBtn.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTime = GAME_TIME;
  //타이머 노출
  updateGameTimer(remainingTime);
  timer = setInterval(() => {
    if(remainingTime <= 0) {
      pauseGame();
      //시간초과팝업
      gamePopup.showWithText(score === CARROT_COUNT ? 'WON!!' : 'LOSE (TIME OUT)');
      sound.alertSoundPlay();
      return;
    }
    updateGameTimer(--remainingTime);
  }, 1000);
}

function updateGameTimer(time) {
  let minutes = parseInt(time / 60);
  let second = time % 60;
  playTimer.innerText = `${minutes} : ${second}`;
}

function pauseGame() {
  isPlaying = false;
  hideGameBtn();
  clearInterval(timer);
  sound.bgSoundStop();
}

function drawFieldItem(src, className, len) {
  const fieldRect = gameField.getBoundingClientRect();
  // 너비 + hover너비, 높이 + hover높이 80px 제외
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < len; i++) {
    const item = document.createElement('img');
    item.src = src;
    item.setAttribute('class', className);

    const randomLeft = randomNumber(x1, x2);
    const randomTop = randomNumber(y1, y2);

    item.style.left = `${randomLeft}px`;
    item.style.top = `${randomTop}px`;

    gameField.appendChild(item);
  }
}

//min(포함)max(포함x)
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function initField() {
  score = 0;
  gameCount.innerText = CARROT_COUNT;
  gameField.innerHTML = '';
  drawFieldItem('img/carrot.png', 'carrot', CARROT_COUNT);
  drawFieldItem('img/bug.png', 'bug', BUG_COUNT);
}