# Web Repository
- Web Browser, Javascript APIs, Promise, mini Project, Event Loop 복습 및 기억저장(?) 공간

### 각 폴더 코드 핵심 내용만 정리

1. carrot
- 미니 게임 Javascript(ES6)로 만들어보기(진행중!)
- 리팩토링하기

2. coordinates
- 좌표찾기
- 성능개선 : top,left 대신 translate(x,y) 값을 이용함

3. js-callback
- callback 지옥 체험
- Promise 사용, Promise 콜백 지옥 체험ㅠㅠ
- Promise 대신 async, await 사용해보기

4. rabbits
- Web API scrollIntoView 사용
- scrollIntoView option 적용

5. shop
- 처음 내가: 모든 delete 버튼에 click이벤트리스너를 적용함
- 개선: event위임을 이용하여 상위 부모 요소에 click 이벤트리스너를 적용하고 event target을 체크하여 삭제 기능을 수행함

6. use_webAPIs
- window screen size 체크, window scroll 제어 이것저것
- (DOM) node -> window, document, element 
- window screen(윈도우창 전체) : window.screen.width, window.screen.height
- document size : document.documentElement.clientWidth, document.documentElement.clientHeight
