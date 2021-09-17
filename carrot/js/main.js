import { Game, Reason } from "./game.js";
import Popup from "./popup.js";
import * as sound from "./sound.js";

const CARROT_COUNT = 10; //Immutable
const BUG_COUNT = 10;
const GAME_TIME = 10;

const gamePopup = new Popup();
const game = new Game(GAME_TIME, CARROT_COUNT, BUG_COUNT);

gamePopup.setClickListener(() => {
  gamePopup.hide();
  game.start();
});

game.setGamePauseListener((reason) => {
  let text;

  switch(reason) {
    case Reason.lose:
      text = 'Lose!'
      sound.bugSoundPlay();
      break;
    case Reason.win:
      text = 'Won!!'
      sound.winSoundPlay();
      break;
    case Reason.stop:
      text = 'Replay?';
      sound.alertSoundPlay();
      break;
    default:
      throw new Error('not valid reason!');
  }

  gamePopup.showWithText(text);
});