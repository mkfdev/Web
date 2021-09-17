import { GameBuilder, Reason } from "./game.js";
import Popup from "./popup.js";
import * as sound from "./sound.js";

const gamePopup = new Popup();

const game = new GameBuilder()
                .setGameDuration(10)
                .setCarrotCount(10)
                .setBugCount(10)
                .build();

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