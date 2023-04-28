import keybord from "./keybord";

const body = document.querySelector('.body');

const enKeybord = {
  firsSubRow: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Delete'],
  firstRow: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Delete'],
  secondRow: ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  thirdRow: ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Return'],
  fourthRow: ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
  fifthRow: ['Fn', 'Control', 'Option', 'Command', ' ', 'Command', 'Option', ' ↑ ', ' ← ', ' ↓ ', ' → '],
};

/* const ruKeybord = {
  firsSubRow: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Delete'],
  firstRow: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Delete'],
  secondRow: ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\'],
  thirdRow: ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Return'],
  fourthRow: ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Shift'],
  fifthRow: ['Fn', 'Control', 'Option', 'Command', ' ', 'Command', 'Option', 
  ' ↑ ', ' ← ', ' ↓ ', ' → '],
};
*/

const wrapper = document.createElement('div');
wrapper.className = 'wrapper';

const header = document.createElement('h1');
header.className = 'header';
header.innerHTML = 'RSS Virtual Keyboard';

const textAria = document.createElement('textarea');
textAria.className = 'text-wrapper';
textAria.placeholder = 'I am new textAria look at me';

const keybordWrapper = document.createElement('div');
keybordWrapper.className = 'keybord-wrapper';

const discriptionOS = document.createElement('p');
discriptionOS.className = 'discription';
discriptionOS.innerHTML = 'Клавиатура создана в операционной системе macOS.';

const discriptionLG = document.createElement('p');
discriptionLG.className = 'discription';
discriptionLG.innerHTML = 'Для переключения языка комбинация: левыe control + space.';


// console.log(createRow(firstRow));

body.insertAdjacentElement('afterbegin', wrapper);
wrapper.insertAdjacentElement('afterbegin', header);
wrapper.insertAdjacentElement('beforeend', textAria);
wrapper.insertAdjacentElement('beforeend', keybordWrapper);
wrapper.insertAdjacentElement('beforeend', discriptionOS);
wrapper.insertAdjacentElement('beforeend', discriptionLG);



// keybord.insertAdjacentElement('beforeend', createRow(firstRow));
// keybord.insertAdjacentElement('beforeend', createRow(secondRow));
// keybord.insertAdjacentElement('beforeend', createRow(thirdRow));
// keybord.insertAdjacentElement('beforeend', createRow(fourthRow));
// keybord.insertAdjacentElement('beforeend', createRow(fifthRow));

const keysAll = document.querySelectorAll('.key');
// const keysSpecial = document.querySelectorAll('.special');
const rows = document.querySelectorAll('.keybord__row');

rows[0].classList.add('hide'); // TODO положить в init

function addAttribute(keysArr) {
  keysArr.forEach((element, i) => {
    // console.log(element, i);
    if (element.firstChild.innerHTML === 'Shift') {
      element.setAttribute('dataname', i === 55 ? 'ShiftLeft' : 'ShiftRight');
    } else if (element.firstChild.innerHTML === ' ') {
      element.setAttribute('dataname', 'Space');
    } else if (element.firstChild.innerHTML === 'Return') {
      element.setAttribute('dataname', 'Enter');
    } else if (element.firstChild.innerHTML === 'Delete') {
      element.setAttribute('dataname', 'Backspace');
    } else if (element.firstChild.innerHTML === 'Control') {
      element.setAttribute('dataname', 'ControlLeft');
    } else if (element.firstChild.innerHTML === 'Command') {
      element.setAttribute('dataname', i === 70 ? 'MetaLeft' : 'MetaRight');
    } else if (element.firstChild.innerHTML === 'Option') {
      element.setAttribute('dataname', i === 69 ? 'AltLeft' : 'AltRight');
    } else if (element.firstChild.innerHTML === ' ↑ ') {
      element.setAttribute('dataname', 'ArrowUp');
    } else if (element.firstChild.innerHTML === ' ← ') {
      element.setAttribute('dataname', 'ArrowLeft');
    } else if (element.firstChild.innerHTML === ' ↓ ') {
      element.setAttribute('dataname', 'ArrowDown');
    } else if (element.firstChild.innerHTML === ' → ') {
      element.setAttribute('dataname', 'ArrowRight');
    } else if (element.classList.contains('special')) {
      element.setAttribute('dataname', `${element.firstChild.innerHTML}`);
    } else {
      element.setAttribute('dataname', `${element.firstChild.innerHTML.toLowerCase()}`);
    }
  });
}

addAttribute(keysAll);

function pressDown(e) {
  console.log(e);
  keysAll.forEach((element) => {
    // console.log(e);
    if (element.classList.contains('special')) {
      if (element.getAttribute('dataname') === e.code) {
        if (e.key === 'Shift') {
          keybordWrapper.classList.add('upper-case');
          keybordWrapper.firstChild.classList.remove('hide');
          keybordWrapper.children[1].classList.add('hide');
        }
        element.classList.add('active');
      }
    } else if (element.getAttribute('dataname') === e.key || element.getAttribute('dataname') === e.key.toLowerCase()) {
      element.classList.add('active');
    }
  });
  textAria.focus();
}

function pressUp(e) {
  keysAll.forEach((element) => {
    if (element.classList.contains('special')) {
      if (element.getAttribute('dataname') === e.code) {
        if (e.key === 'Shift') {
          keybordWrapper.classList.remove('upper-case');
          keybordWrapper.firstChild.classList.add('hide');
          keybordWrapper.children[1].classList.remove('hide');
        }
        element.classList.remove('active');
      }
    } else if (element.getAttribute('dataname') === e.key || element.getAttribute('dataname') === e.key.toLowerCase()) {
      element.classList.remove('active');
    }
  });
}

document.addEventListener('keydown', pressDown);
document.addEventListener('keyup', pressUp);
