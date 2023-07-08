const items = document.querySelectorAll('.name');
const cardNote = document.querySelectorAll('.items__image');
const placeholders = document.querySelectorAll('.placeholder');
const names = document.querySelectorAll('.name');
const btnReset = document.querySelector('.reset');

items.forEach((item) => {
  item.addEventListener('dragstart', dragstart);
});

items.forEach((item) => {
  item.addEventListener('dragend', dragend);
});

function dragstart(evt) {
  console.log('dragstart');
  evt.target.classList.add('dragging');
  setTimeout(() => evt.target.classList.add('hidden'));
}

function dragend(evt) {
  console.log('dragend');
  evt.target.classList.remove('dragging', 'hidden');
}

placeholders.forEach((item) => {
  //item.addEventListener('dragover', dragover);

  item.addEventListener('dragover', dragover);
  item.addEventListener('dragenter', dragenter);
  item.addEventListener('dragleave', dragleave);

  //item.addEventListener('drop', dragdrop);
  item.addEventListener('drop', (evt) => {
    console.log('dragdrop');
    item.append(document.querySelector('.dragging'));
    evt.target.classList.remove('hovered');
    /////////////////////////////////////////////////////////////////////////
    //атрибуты окно для вставки
    let past;
    for (const name of item.children) {
      past = name.getAttribute('data-note'); //атрибуты окно для вставки data-note элемента внутри placholders
    }
    //атрибуты карточек
    let cardAttr;
    //цикл, который по очереди сравнит data-image в items с data-note элемента внутри placholders

    for (const i of cardNote) {
      cardAttr = i.getAttribute('data-image');
      if (cardAttr === past) {
        console.log(
          '_____________________________________________________________'
        );
        console.log('OK');
        console.log('атрибут карточки', cardAttr);
        console.log('атрибут вставки', past);
        console.log(
          '_____________________________________________________________'
        );
      } else {
      }
      console.log(
        '_____________________________________________________________'
      );
      console.log('NO');
      console.log('атрибут карточки', cardAttr);
      console.log('атрибут вставки', past);
      console.log(
        '_____________________________________________________________'
      );
    }
  });
});

function dragover(evt) {
  console.log('dragover');
  evt.preventDefault();
}

function dragenter(evt) {
  console.log('dragenter');
  evt.target.classList.add('hovered');
}

function dragleave(evt) {
  console.log('dragleave');
  evt.target.classList.remove('hovered');
}

// function dragdrop() {
//   console.log('dragdrop');
// }

btnReset.addEventListener('click', function () {
  window.location.reload();
});

//Реализация верного ответа: У Вас должен быть массив items с Вашими нотами и атрибутами data-image. У Вас уже есть массив placеholders с перетащеными в них карточками. Вам остается каждый раз в событии drop запустить цикл, который по очереди сравнит data-image в items с data-note элемента внутри placholders. Если все совпадают, ноты расположены верно и человеку можно сообщить о победе.
