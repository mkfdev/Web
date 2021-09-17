'use strict';
import { Field, ItemType } from "./field.js";
import * as sound from "./sound.js";

export class GameBuilder {
  setGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  setCarrotCount(count) {
    this.carrotCount = count;
    return this;
  }

  setBugCount(count) {
    this.bugCount = count;
    return this;
  }

  build() {
    return new Game(
        this.gameDuration,
        this.carrotCount,
        this.bugCount
    )
  }
}

export const Reason = Object.freeze(
  {
    lose: 'lose',
    win: 'win',
    stop: 'stop'
  }
)

export class Game {
  constructor(gameTime, carrotCount, bugCount) {
    this.isPlaying = false;
    this.score = 0;
    this.gameTime = gameTime;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.timer = undefined;
    this.gameBtn = document.querySelector('.carrotCatch-record__btn');
    this.playBtn = document.querySelector('.fa-play');
    this.playTimer = document.querySelector('.timer');
    this.gameCount = document.querySelector('.count');

    this.gameBtn.addEventListener('click', () => {
      if(this.isPlaying) {
        this.stopGame();
      } else {
        this.start();
      }
    });

    this.gameField = new Field(this.carrotCount, this.bugCount);
    this.gameField.setClickListener(this.onItemClick);
  }
  
  onItemClick = (type) => {
    if(!this.isPlaying) return;

    if(type === ItemType.carrot) {
      sound.carrostSoundPlay();

      this.updateScore();

      if(this.score === this.carrotCount) {
        sound.winSoundPlay();
        this.pauseGame(Reason.win);
      }
    } else if (type === ItemType.bug) {
      sound.bugSoundPlay();
      this.pauseGame(Reason.lose);
    }
  }

  start() {
    this.isPlaying = true;
    this.init();
    this.showGameStopBtn();
    this.startGameTimer();
    sound.bgSoundPlay();
  }
  
  stopGame() {
    this.pauseGame(Reason.stop);
    sound.alertSoundPlay();
  }
  
  init() {
    this.score = 0;
    this.gameCount.innerText = this.carrotCount;
    this.gameField.initField();
  }

  hideGameBtn() {
    this.gameBtn.style.visibility = 'hidden';
  }
  
  showGameStopBtn() {
    const buttonIcon = this.gameBtn.querySelector('.fas');
    buttonIcon.classList.add('fa-stop');
    buttonIcon.classList.remove('fa-play');
    this.gameBtn.style.visibility = 'visible';
  }
  
  startGameTimer() {
    let remainingTime = this.gameTime;

    this.updateGameTimer(remainingTime);
    this.timer = setInterval(() => {
      if(remainingTime <= 0) {
        this.pauseGame(this.score === this.carrotCount ? Reason.win: Reason.lose);
        sound.alertSoundPlay();
        return;
      }
      this.updateGameTimer(--remainingTime);
    }, 1000);
  }
  
  updateGameTimer(time) {
    let minutes = parseInt(time / 60);
    let second = time % 60;
    this.playTimer.innerText = `${minutes} : ${second}`;
  }

  updateScore() {
    this.score++;
    this.gameCount.innerText = this.carrotCount - this.score;
  }
  
  pauseGame(text) {
    this.isPlaying = false;
    this.hideGameBtn();
    clearInterval(this.timer);
    sound.bgSoundStop();

    this.onPause && this.onPause(text);
  }

  setGamePauseListener(onPause) {
    this.onPause = onPause;
  }
}



