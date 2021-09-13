let isPlaying = false;
let count = 0;
let time = 10;
let gameTimer = null;
const carrotCatch = document.querySelector('.carrotCatch');
const gameBtn = document.querySelector('.carrotCatch-record__btn');
const playBtn = document.querySelector('.fa-play');
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

function playGame() {
  //isPlaying : play check
  isPlaying = true;
  gameBtn.style.display = 'inline-block';
  if(isPlaying) {
    gameBtn.innerHTML = 
    `<i class="fas fa-stop">
      <span class="blind">stop</span>
    </i>`;
    const stopBtn = document.querySelector('.fa-stop');
    stopBtn.addEventListener('click', () => {
      isPlaying = false;
      // 타이머 stop
      stopIntervel(gameTimer);
      audioPlay.pause();
      openPopup('RePlay?');
    });
  } else {
    gameBtn.innerHTML =
    `<i class="fas fa-play">
      <span class="blind">Play</span>
    </i>`;
  }

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
      audioPlay.pause();
      setTimeout(() => {
        //팝업노출 - 시간초과 게임종료
        openPopup('YOU LOST!');
        // 패배 알림 팝업 사운드
        audioAlert.play();
      }, 500);
    }
  }, 1000);

  // 이미지 랜덤 출력
  const carrotSrc = 'img/carrot.png';
  const bugSrc = 'img/bug.png';
  //setRandomImg(이미지경로, 클래스명, 갯수) 호출
  setRandomImg(carrotSrc, 'carrot', 10);
  setRandomImg(bugSrc, 'bug', 30);
}

function playAudio() {
  audioPlay.play();
}

function stopIntervel(timer) {
  clearInterval(timer);
}

function openPopup(text) {
  playPopupMsg.innerHTML = text;
  playPopup.classList.add('opened');
  gameBtn.style.display = 'none';
}

function setRandomImg(src, className, len) {
  // 너비 + hover너비, 높이 + hover높이 88px 제외
  // left, top 값 지정시 사이즈가 오버됨
  const panelWidth = gamePanel.clientWidth - 88;
  const panelHeihgt = gamePanel.clientHeight - 88;

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

function initGame() {
  // 팝업 숨김
  playPopup.classList.remove('opened');
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
  playGame();
}

//gameBtn클릭시
playBtn.addEventListener('click', () => {
  if(isPlaying) return;
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
      audioPlay.pause();
      setTimeout(() => {
       //팝업노출 - 승 게임종료
       openPopup('YOU WIN!');
       // 승리 알림 팝업 사운드
       audioWin.play();
      }, 500);
    }
  }

  // 벌레이미지 클릭시
  if(event.target.className === 'bug') {
    audioBug.play();
    isPlaying = false;
    stopIntervel(gameTimer);
    audioPlay.pause();
    setTimeout(() => {
      //팝업노출 - 패 게임종료
      openPopup('YOU LOST!');
      // 패배 알림 팝업 사운드
      audioAlert.play();
    }, 500);
  }
});

replayBtn.addEventListener('click', () => {
  //게임 상태 초기화
  initGame();
})