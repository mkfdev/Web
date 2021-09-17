'use strict';

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug'
});

export class Field {
  constructor(carrotCount, bugCount){
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.carrotCatch-game');
    this.field.addEventListener('click', this.onClick);
  }

  setClickListener(onItemClick){
    this.onItemClick = onItemClick;
  }

  onClick = event => {
    const target = event.target;
    if(target.classList.contains('carrot')) {
      target.remove();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if(target.classList.contains('bug')) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  }

  drawFieldItem(src, className, len) {
    const fieldRect = this.field.getBoundingClientRect();
    // 너비 + hover너비, 높이 + hover높이 80px 제외
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
  
    for (let i = 0; i < len; i++) {
      const item = document.createElement('img');
      item.src = src;
      item.setAttribute('class', className);
  
      const randomLeft = this.randomNumber(x1, x2);
      const randomTop = this.randomNumber(y1, y2);
  
      item.style.left = `${randomLeft}px`;
      item.style.top = `${randomTop}px`;
  
      this.field.appendChild(item);
    }
  }

  //min(포함)max(포함x)
  randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  initField() {
    this.field.innerHTML = '';
    this.drawFieldItem('img/carrot.png', 'carrot', this.carrotCount);
    this.drawFieldItem('img/bug.png', 'bug', this.bugCount);
  }
}