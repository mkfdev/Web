// window.addEventListener('DOMContentLoaded', () => {
//   console.log('DOMContentLoaded');
// });

// window.addEventListener('load', () => {
//   console.log('all resource loaded');
// });

const target = document.querySelector('.target');
const horizon = document.querySelector('.horizon');
const vertical = document.querySelector('.vertical');
const coordinates = document.querySelector('.target-coordinates');


// defer -> documnet load되면 실행
// resource가 load 되지 않아 rect값을 못 가져올 경우 load사용
window.addEventListener('load', () => {
  const rect = target.getBoundingClientRect();
  const recHalftWidth = rect.width / 2;
  const rectHalfHeight = rect.height/ 2;
  
  window.addEventListener('mousemove', event => {
    const x = event.clientX;
    const y = event.clientY;
  
    vertical.style.transform = `translateX(${x}px)`;
    horizon.style.transform = `translateY(${y}px)`;
  
    target.style.transform = `translate(${x - recHalftWidth}px, ${y - rectHalfHeight}px)`;
    coordinates.style.transform = `translate(${x}px, ${y}px)`;  
    coordinates.innerHTML = `${x}, ${y}`;
  });
});