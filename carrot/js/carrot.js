let isPlaying = false;
let count = 0;
let time = 10;
let gameTimer = null;
const carrotCatch = document.querySelector('.carrotCatch');
const gameBtn = document.querySelector('.carrotCatch-record__btn');
const playTimer = document.querySelector('.timer');
const gamePanel = document.querySelector('.carrotCatch-game');
const catchCount = document.querySelector('.count');
const playPopup = document.querySelector('.carrotCatch-popup');
const playPopupMsg = document.querySelector('.message');
const replayBtn = document.querySelector('.carrotCatch-popup_btn');
const audioPlay = new Audio('sound/bg.mp3');
const audioCarrot = new Audio('sound/carrot_pull.mp3');
const audioBug = new Audio('sound/bug_pull.mp3');
const audioWin = new Audio('sound/game_win.mp3');
const audioAlert =  new Audio('sound/alert.wav');

function playAudio() {
  audioPlay.play();
}

function stopIntervel(timer) {
  clearInterval(timer);
}

function openPopup(text) {
  playPopupMsg.innerHTML = text;
  playPopup.classList.add('opened');
}

function setRandomImg(src, className, len) {
  // 너비, 높이80 제외(left, top 값 지정시 사이즈가 오버됨)
  const panelWidth = gamePanel.clientWidth - 80;
  const panelHeihgt = gamePanel.clientHeight - 80;

  for (i = 0; i < len; i++) {
    const IMG = document.createElement('img');
    IMG.src = src;
    IMG.setAttribute('class', className);

    const randomLeft = Math.floor(Math.random() * panelWidth) +'px';
    const randomTop = Math.floor(Math.random() * panelHeihgt)  + 'px';

    IMG.style.left = randomLeft;
    IMG.style.top = randomTop;

    gamePanel.appendChild(IMG);
  }
}

function playGame() {
  //플레이 중 시작버튼 숨기기
  gameBtn.classList.add('hide');
  
  //당근 카운트 갯수 설정
  count = 10;
  catchCount.innerHTML = count;

  //오디오 play
  playAudio();

  //타이머 생성,시작
  gameTimer = setInterval(() => {
    let hour = parseInt(time / 60);
    let second = time % 60;

    if(hour.toString().length == 1) {
      hour = `0${hour}`;
    }
    if(second.toString().length == 1) {
      second = `0${second}`;
    }
    // 타이머 노출 형태 00:00
    playTimer.innerHTML = `${hour} : ${second}`;

    time--;

    if (time < 0) {
      // play check: stop
      isPlaying = false;
      // 타이머 stop
      stopIntervel(gameTimer);
      playTimer.innerHTML = `${hour} : ${second}`;
      // 팝업노출-시간초과로 게임종료
      openPopup('YOU LOST!');
      audioPlay.pause();
      audioAlert.play();
    }
  }, 1000);

  // 이미지 랜덤 출력
  const carrotSrc = 'img/carrot.png';
  const bugSrc = 'img/bug.png';
  //setRandomImg(이미지경로, 클래스명, 갯수) 호출
  setRandomImg(carrotSrc, 'carrot', 10);
  setRandomImg(bugSrc, 'bug', 30);
}

function initGame() {
  // 팝업 숨김
  playPopup.classList.remove('opened');
  //play 버튼 노출
  gameBtn.classList.remove('hide');
  //게임 랜덤이미지 리셋
  gamePanel.innerHTML = '';
  //타이머 stop
  stopIntervel(gameTimer);
  time = 10;
  playTimer.innerHTML = '00 : 00';
  //카운터 리셋
  count = 0;
  catchCount.innerHTML = count;
  //배경음악 리셋
  audioPlay.currentTime = 0;
}

//gameBtn클릭시
gameBtn.addEventListener('click', () => {
  // play check flag
  isPlaying = true;
  playGame();
});

gamePanel.addEventListener('click', event => {
  if(!isPlaying) return;

  // 당근이미지 클릭시
  if(event.target.className === 'carrot') {
    event.target.classList.add('hide');
    audioCarrot.play();
    audioCarrot.currentTime = 0;
    //남은 당근 카운트 
    count--;
    catchCount.innerHTML = count;

    // 당근 캐치 완료
    if(count == 0) {
      //play check
      isPlaying = false;
      //타이머 stop
      stopIntervel(gameTimer);
      //팝업노출 - 승 게임종료
      openPopup('YOU WIN!');
      audioPlay.pause();
      audioWin.play();
    }
  }

  // 벌레이미지 클릭시
  if(event.target.className === 'bug') {
    audioBug.play();
    isPlaying = false;
    stopIntervel(gameTimer);
    //팝업노출 - 패 게임종료
    openPopup('YOU LOST!');
    audioPlay.pause();
    //팝업 소리
    setTimeout(() => {
      audioAlert.play();  
    }, 300);
  }
});

replayBtn.addEventListener('click', () => {
  //게임 상태 초기화
  initGame();
})