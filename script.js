const items = document.querySelectorAll('.name');
console.log(items);
const placeholders = document.querySelectorAll('.placeholder');
console.log(placeholders);
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
