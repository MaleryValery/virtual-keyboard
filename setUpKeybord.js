import keybord from './keybord.js';

const body = document.querySelector('.body');

/* const enKeybord = {
  firsSubRow: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Delete'],
  firstRow: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Delete'],
  secondRow: ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  thirdRow: ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Return'],
  fourthRow: ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
  fifthRow: ['Fn', 'Control', 'Option', 'Command', ' ', 'Command', 'Option',
   ' ↑ ', ' ← ', ' ↓ ', ' → '],
};
*/
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

body.insertAdjacentElement('afterbegin', wrapper);
wrapper.insertAdjacentElement('afterbegin', header);
wrapper.insertAdjacentElement('beforeend', textAria);
wrapper.insertAdjacentElement('beforeend', keybordWrapper);
wrapper.insertAdjacentElement('beforeend', discriptionOS);
wrapper.insertAdjacentElement('beforeend', discriptionLG);

// const rows = document.querySelectorAll('.keybord__row');
let caps;
let key;
let enLg;
let ruLg;
let lowerCase;
let upperCase;
let shiftCaps;

const createRow = function createRow(row) {
  const newRow = document.createElement('div');
  newRow.className = 'keybord__row';

  const arrowWrapper = document.createElement('div');
  arrowWrapper.className = 'arrow-wrapper';

  const temp = row.map((element) => {
    Object.keys(element).forEach((keyObj) => {
      if (keyObj === 'className') {
        key = document.createElement('div');
        key.className = `${element[keyObj]} key`;
      } else if (keyObj === 'enLg') {
        enLg = document.createElement('div');
        enLg.className = keyObj;
      } else if (keyObj === 'ruLg') {
        ruLg = document.createElement('div');
        ruLg.className = `${keyObj} hide`;
      }
    });

    Object.keys(element.enLg).forEach((enSpan) => {
      if (enSpan === 'caps') {
        caps = document.createElement('span');
        caps.className = 'caps-lock hide';
        caps.innerHTML = element.enLg[enSpan];
        enLg.append(caps);
      } else if (enSpan === 'lowerCase') {
        lowerCase = document.createElement('span');
        lowerCase.className = 'lower-case';
        lowerCase.innerHTML = element.enLg[enSpan];
        enLg.append(lowerCase);
      } else if (enSpan === 'upperCase') {
        upperCase = document.createElement('span');
        upperCase.className = 'upper-case hide';
        upperCase.innerHTML = element.enLg[enSpan];
        enLg.append(upperCase);
      } else if (enSpan === 'shiftCaps') {
        shiftCaps = document.createElement('span');
        shiftCaps.className = 'shift-caps hide';
        shiftCaps.innerHTML = element.enLg[enSpan];
        enLg.append(shiftCaps);
      }
    });
    Object.keys(element.ruLg).forEach((ruSpan) => {
      if (ruSpan === 'caps') {
        caps = document.createElement('span');
        caps.className = 'caps-lock hide';
        caps.innerHTML = element.ruLg[ruSpan];
        ruLg.append(caps);
      } else if (ruSpan === 'lowerCase') {
        lowerCase = document.createElement('span');
        lowerCase.className = 'lower-case';
        lowerCase.innerHTML = element.ruLg[ruSpan];
        ruLg.append(lowerCase);
      } else if (ruSpan === 'upperCase') {
        upperCase = document.createElement('span');
        upperCase.className = 'upper-case hide';
        upperCase.innerHTML = element.ruLg[ruSpan];
        ruLg.append(upperCase);
      } else if (ruSpan === 'shiftCaps') {
        shiftCaps = document.createElement('span');
        shiftCaps.className = 'shift-caps hide';
        shiftCaps.innerHTML = element.ruLg[ruSpan];
        ruLg.append(shiftCaps);
      }
    });

    if (key.classList.contains('ArrowUp') || key.classList.contains('ArrowDown') ||
      key.classList.contains('ArrowLeft') || key.classList.contains('ArrowRight')) {
      key.classList.add('arrow');
    }

    let isArrowWrapper = false;

    key.append(enLg, ruLg);

    if (key.classList.contains('arrow')) {
      arrowWrapper.append(key);
      isArrowWrapper = true;
    }

    return isArrowWrapper === true ? arrowWrapper : key;
  });

  newRow.append(...temp);
  return newRow;
};

const createKeybord = function createKeybord(nodeElem, arr) {
  arr.forEach((element) => {
    nodeElem.insertAdjacentElement('beforeend', createRow(element));
  });
  return nodeElem;
};

createKeybord(keybordWrapper, keybord);

// function addAttribute(keysArr) {
//   keysArr.forEach((element, i) => {
//     // console.log(element, i);
//     if (element.firstChild.innerHTML === 'Shift') {
//       element.setAttribute('dataname', i === 55 ? 'ShiftLeft' : 'ShiftRight');
//     } else if (element.firstChild.innerHTML === ' ') {
//       element.setAttribute('dataname', 'Space');
//     } else if (element.firstChild.innerHTML === 'Return') {
//       element.setAttribute('dataname', 'Enter');
//     } else if (element.firstChild.innerHTML === 'Delete') {
//       element.setAttribute('dataname', 'Backspace');
//     } else if (element.firstChild.innerHTML === 'Control') {
//       element.setAttribute('dataname', 'ControlLeft');
//     } else if (element.firstChild.innerHTML === 'Command') {
//       element.setAttribute('dataname', i === 70 ? 'MetaLeft' : 'MetaRight');
//     } else if (element.firstChild.innerHTML === 'Option') {
//       element.setAttribute('dataname', i === 69 ? 'AltLeft' : 'AltRight');
//     } else if (element.firstChild.innerHTML === ' ↑ ') {
//       element.setAttribute('dataname', 'ArrowUp');
//     } else if (element.firstChild.innerHTML === ' ← ') {
//       element.setAttribute('dataname', 'ArrowLeft');
//     } else if (element.firstChild.innerHTML === ' ↓ ') {
//       element.setAttribute('dataname', 'ArrowDown');
//     } else if (element.firstChild.innerHTML === ' → ') {
//       element.setAttribute('dataname', 'ArrowRight');
//     } else if (element.classList.contains('special')) {
//       element.setAttribute('dataname', `${element.firstChild.innerHTML}`);
//     } else {
//       element.setAttribute('dataname', `${element.firstChild.innerHTML.toLowerCase()}`);
//     }
//   });
// }

// addAttribute(keysAll);
const keysAll = document.querySelectorAll('.key');
const upperCaseAll = document.querySelectorAll('.upper-case');
const lowerCaseAll = document.querySelectorAll('.lower-case');
const capsAll = document.querySelectorAll('.caps-lock');
const shiftCapsAll = document.querySelectorAll('.shift-caps');
let isCapsPressed;

function pressDown(e) {
  isCapsPressed = e.getModifierState('CapsLock');
  console.log(e.getModifierState('Shift'));
  keysAll.forEach((element) => {
    if (element.classList.contains('special')) {
      if (element.classList.contains(e.code)) {
        if (e.key === 'Shift') {
          upperCaseAll.forEach((span) => {
            span.classList.remove('hide');
          });
          lowerCaseAll.forEach((span) => {
            span.classList.add('hide');
          });
          capsAll.forEach((span) => {
            span.classList.add('hide');
          });
          shiftCapsAll.forEach((span) => {
            span.classList.add('hide');
          });
        } else if (e.key === 'Tab') {
          element.classList.add('active');
        } else if (e.key === 'CapsLock') {
          isCapsPressed = true;
          capsAll.forEach((span) => {
            span.classList.remove('hide');
          });
          lowerCaseAll.forEach((span) => {
            span.classList.add('hide');
          });
          upperCaseAll.forEach((span) => {
            span.classList.add('hide');
          });
          shiftCapsAll.forEach((span) => {
            span.classList.add('hide');
          });
        }
        element.classList.add('active');
      }
    }
  });
  textAria.focus();
}

function pressUp(e) {
  keysAll.forEach((element) => {
    if (element.classList.contains('special')) {
      if (element.classList.contains(e.code)) {
        if (e.key === 'Shift') {
          if (isCapsPressed === false) {
            upperCaseAll.forEach((span) => {
              span.classList.add('hide');
            });
            lowerCaseAll.forEach((span) => {
              span.classList.remove('hide');
            });
            capsAll.forEach((span) => {
              span.classList.add('hide');
            });
            shiftCapsAll.forEach((span) => {
              span.classList.add('hide');
            });
          } else {
            upperCaseAll.forEach((span) => {
              span.classList.add('hide');
            });
            lowerCaseAll.forEach((span) => {
              span.classList.add('hide');
            });
            capsAll.forEach((span) => {
              span.classList.remove('hide');
            });
            shiftCapsAll.forEach((span) => {
              span.classList.add('hide');
            });
          }
        } else if (e.key === 'Tab') {
          element.classList.remove('active');
        } else if (e.key === 'CapsLock') {
          isCapsPressed = false;
          capsAll.forEach((span) => {
            span.classList.add('hide');
          });
          lowerCaseAll.forEach((span) => {
            span.classList.remove('hide');
          });
          upperCaseAll.forEach((span) => {
            span.classList.add('hide');
          });
          shiftCapsAll.forEach((span) => {
            span.classList.add('hide');
          });
          if (e.key === 'CapsLock' && e.getModifierState('Shift')) {
            capsAll.forEach((span) => {
              span.classList.add('hide');
            });
            lowerCaseAll.forEach((span) => {
              span.classList.add('hide');
            });
            upperCaseAll.forEach((span) => {
              span.classList.remove('hide');
            });
            shiftCapsAll.forEach((span) => {
              span.classList.add('hide');
            });
          }
        }
        element.classList.remove('active');
      }
    }
  });
}

document.addEventListener('keydown', pressDown);
document.addEventListener('keyup', pressUp);
