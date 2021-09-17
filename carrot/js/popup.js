'use strict';

export default class Popup {
  constructor() {
    this.playPopup = document.querySelector('.carrotCatch-popup');
    this.playPopupMsg = document.querySelector('.message');
    this.replayBtn = document.querySelector('.carrotCatch-popup_btn');
    this.replayBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
    })
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.playPopupMsg.innerHTML = text;
    this.playPopup.classList.add('opened'); 
  }

  hide() {
    this.playPopup.classList.remove('opened');
  }
}