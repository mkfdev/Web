  const list = document.querySelector('.shop-list');
  const item = document.querySelector('.item');
  const input = document.querySelector('.input-item');
  const addBtn = document.querySelector('.btn.add');
  const removeBtn = document.querySelector('.remove');
  const removeAll = document.querySelector('.remove-all');
  let id = 0;

  function onAdd() {
    if(input.value === '') {
      input.focus();
      return
    };

    const text = input.value;
    const item = createItem(text);

    list.appendChild(item);

    item.scrollIntoView({ block:'center' })
    input.value = null;
    input.focus();
  }

  function createItem(text) {
    const newList = document.createElement('li');
    newList.setAttribute('data-id', id);
    newList.innerHTML = `
      <span class="item">${text}</span>
      <button class="btn remove" data-target-id=${id}>
        <i class="fas fa-times" data-target-id=${id}></i>
      </button>
    `;
    id++;
    // newList.addEventListener('click', event => {
    //   if(event.target.tagName == 'BUTTON' || 'I') {
    //     list.removeChild(event.currentTarget);
    //     input.focus();
    //   }
    // });

    // deleteBtn.addEventListener('click', () => {
    //   list.removeChild(newList);
    //   input.focus();
    // })
    return newList;
  }

  //event 위임
  list.addEventListener('click', event => {
    const targetId = event.target.dataset.targetId;
    if(targetId) {
      const item = document.querySelector(`li[data-id="${targetId}"]`)
      item.remove();
    }
    input.focus();
  });

  addBtn.addEventListener('click', () => {
    onAdd();
  });

  input.addEventListener('keydown', event => {
    //한국어. 만들어지기전일 경우 또는 keyup사용
    // if(event.isComposing) {
    //   return;
    // }
    if(event.keyCode == 13) {
      onAdd();
    }
  });

  removeAll.addEventListener('click', () => {
    list.innerHTML = '';
  });


