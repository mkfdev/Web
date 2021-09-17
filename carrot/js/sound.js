'use strict';

const bgSound = new Audio('sound/bg.mp3');
const carrostSound = new Audio('sound/carrot_pull.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const winSound = new Audio('sound/game_win.mp3');
const alertSound =  new Audio('sound/alert.wav');

export function bgSoundPlay(){
  playSound(bgSound);
}

export function carrostSoundPlay(){
  playSound(carrostSound);
}

export function bugSoundPlay(){
  playSound(bugSound);
}

export function winSoundPlay(){
  playSound(winSound);
}

export function alertSoundPlay(){
  playSound(alertSound);
}

export function bgSoundStop(){
  pauseSound(bgSound);
}

function playSound(sound) {
  sound.currentTime =  0;
  sound.play();
}

function pauseSound(sound) {
  sound.pause();
}