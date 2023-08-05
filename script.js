const items = document.querySelectorAll('.name');
console.log(items);
const placeholders = document.querySelectorAll('.placeholder');
console.log(placeholders);
const btnReset = document.querySelector('.reset');

items.forEach((item) => {
  item.addEventListener('dragend', dragend);
  item.addEventListener('dragstart', dragstart);
  item.addEventListener('mousedown', () => {
    playNote(notes[item.dataset.note - 1]);
  });
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

placeholders.forEach((item, i) => {
  //item.addEventListener('dragover', dragover);
  // console.log(item);
  // console.log(item.children);
  item.addEventListener('dragover', dragover);
  item.addEventListener('dragenter', dragenter);
  item.addEventListener('dragleave', dragleave);
  //item.addEventListener('drop', dragdrop);
  item.addEventListener('drop', (evt) => {
    console.log('dragdrop');
    item.append(document.querySelector('.dragging'));
    evt.target.classList.remove('hovered');
    const { finish, right } = checkGame();
    if (finish) {
      if (right) {
        document.querySelector('.check').addEventListener('click', function () {
          document.querySelector('.answer_message').textContent =
            'Здорово! Твой ключ - буква А. Запомни его, он тебе еще пригодится.';

          // document.body.innerHTML = '<h1>Молодец. Ту-ру-ту-ту!!!</h1>';
          // document.body.style.background = 'green';
        });
      } else {
        document.querySelector('.check').addEventListener('click', function () {
          document.querySelector('.answer_message').textContent =
            'Ох... подумай еще';
          // document.body.innerHTML =
          //   '<h1>Лопух. Выгоняем тебя из музыкалки!!!</h1>';
          // document.body.style.background = 'red';
        });
      }
    }
  });
});

function checkGame() {
  const items = document.querySelectorAll('.items__image'); //карточки
  const placeholders = document.querySelectorAll('.placeholder'); //контейнер для вставки

  let finish = true; //игра закончена
  let right = true; //верный ответ

  items.forEach((item, i) => {
    //перебираем карточки
    const note = placeholders[i].querySelector('.name')?.dataset?.note; //атрибуты вставки
    const image = item.dataset.image; //атрибуты картинок
    if (!note) {
      //если карточки не вставлены
      finish = false; //продолжаем играть
    } else if (note !== image) {
      //если не верно вставлено
      right = false;
    }
  });
  return { finish, right };
}

const context = new AudioContext();
let o = null;
let g = null;
const notes = [262, 294, 330, 350, 392, 440, 493];

function playNote(frequency, type = 'sine') {
  o = context.createOscillator();
  g = context.createGain();
  o.type = type;
  o.connect(g);
  o.frequency.value = frequency;
  g.connect(context.destination);
  o.start(0);
  g.gain.exponentialRampToValueAtTime(0.000001, context.currentTime + 3);
}

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

// function answerRight() {
//   placeholders.forEach((item) => {
//     const answer = item.dataset.answer;
//     //console.log(item.dataset.answer);
//     names.forEach((item) => {
//       const note = item.dataset.note;
//       //console.log(item.dataset.note);
//       if (answer === note) {
//         console.log('sdfsdfsdf');
//       }
//     });
//   });
// }

// answerRight();

btnReset.addEventListener('click', function () {
  window.location.reload();
});
