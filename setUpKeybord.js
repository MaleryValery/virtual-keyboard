import keybord from './keybord.js';

const body = document.querySelector('.body');

const wrapper = document.createElement('div');
wrapper.className = 'wrapper';

const header = document.createElement('h1');
header.className = 'header';
header.innerHTML = 'RSS Virtual Keyboard';

const textArea = document.createElement('textarea');
textArea.className = 'text-wrapper';
textArea.placeholder = 'I am new textArea look at me';

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
wrapper.insertAdjacentElement('beforeend', textArea);
wrapper.insertAdjacentElement('beforeend', keybordWrapper);
wrapper.insertAdjacentElement('beforeend', discriptionOS);
wrapper.insertAdjacentElement('beforeend', discriptionLG);

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

const keysAll = document.querySelectorAll('.key');
const enLgAll = document.querySelectorAll('.enLg');
const ruLgAll = document.querySelectorAll('.ruLg');
const capsAll = document.querySelectorAll('.caps-lock');
const upperCaseAll = document.querySelectorAll('.upper-case');
const lowerCaseAll = document.querySelectorAll('.lower-case');
const shiftCapsAll = document.querySelectorAll('.shift-caps');
const shiftLeft = document.querySelector('.ShiftLeft');
const shiftRight = document.querySelector('.ShiftRight');
const capsLock = document.querySelector('.CapsLock');
let langEn = true;
let isCapsPressed;
let isControlPressed;
let isMetaPressed;

function changeLeng() {
  if (langEn) {
    enLgAll.forEach((div) => {
      div.classList.add('hide');
    });
    ruLgAll.forEach((div) => {
      div.classList.remove('hide');
    });
    langEn = false;
    localStorage.setItem('langEn', 'false');
  } else {
    enLgAll.forEach((div) => {
      div.classList.remove('hide');
    });
    ruLgAll.forEach((div) => {
      div.classList.add('hide');
    });
    langEn = true;
    localStorage.setItem('langEn', 'true');
  }
}

function changeRegisterUp() {
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

function changeRegisterDown() {
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
}

function changeCapsLock() {
  if (isCapsPressed) {
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
}

function getKeyValue(event) {
  const [keyContainer] = [...event.closest('.key').children].filter((el) => !el.classList.contains('hide'));
  const keySpan = keyContainer.children;
  const [keySpanValue] = [...keySpan].filter((el) => !el.classList.contains('hide'));
  return keySpanValue;
}

function pressDown(e) {
  isCapsPressed = e.getModifierState('CapsLock');
  isControlPressed = e.getModifierState('Control');
  isMetaPressed = e.getModifierState('Meta');
  keysAll.forEach((element) => {
    if (element.classList.contains('special')) {
      if (element.classList.contains(e.code)) {
        if (e.key === 'Shift') {
          changeRegisterUp();
        } else if (e.key === 'Tab') {
          e.preventDefault();
          textArea.setRangeText('   ', textArea.selectionStart, textArea.selectionEnd, 'end');
          textArea.focus();
        } else if (e.key === 'Space') {
          textArea.setRangeText(' ', textArea.selectionStart, textArea.selectionEnd, 'end');
          textArea.focus();
        } else if (e.key === 'CapsLock') {
          changeCapsLock();
          if (e.key === 'CapsLock' && e.getModifierState('Shift')) {
            changeRegisterUp();
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          textArea.value += '↓';
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          textArea.value += '↑';
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          textArea.value += '←';
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          textArea.value += '→';
        } else if (isControlPressed && isMetaPressed) {
          changeLeng();
        }
        element.classList.add('active');
      }
    } else if (element.classList.contains(e.code)) {
      e.preventDefault();
      element.classList.add('active');
      const [activKey] = [...keysAll].filter((el) => el.classList.contains(e.code));
      const keySpanValue = getKeyValue(activKey);
      textArea.value += keySpanValue.textContent;
    }
  });
  textArea.focus();
}

function pressUp(e) {
  keysAll.forEach((element) => {
    if (element.classList.contains('special')) {
      if (element.classList.contains(e.code)) {
        if (e.key === 'Shift') {
          if (!capsLock.classList.contains('active')) {
            changeRegisterDown();
          } else {
            changeCapsLock();
          }
        } else if (e.key === 'Tab') {
          element.classList.remove('active');
        } else if (e.key === 'Space') {
          element.classList.remove('active');
        } else if (e.key === 'CapsLock') {
          capsLock.classList.remove('active');
          changeRegisterDown();
          if (e.key === 'CapsLock' && e.getModifierState('Shift')) {
            changeRegisterUp();
          }
        }
        element.classList.remove('active');
      }
    } else if (element.classList.contains(e.code)) {
      element.classList.remove('active');
    }
  });
}

document.addEventListener('keydown', pressDown);
document.addEventListener('keyup', pressUp);

keybordWrapper.addEventListener('mousedown', (e) => {
  textArea.focus();
  const { target } = e;
  if (target.closest('.key')) {
    const keySpanValue = getKeyValue(target);
    if (keySpanValue.textContent === 'caps lock') {
      textArea.value += '';
      capsLock.classList.toggle('active');
      if (capsLock.classList.contains('active')) {
        changeCapsLock();
        if (shiftLeft.classList.contains('active') || shiftRight.classList.contains('active')) {
          changeRegisterUp();
        }
      } else if (shiftLeft.classList.contains('active') || shiftRight.classList.contains('active')) {
        changeRegisterUp();
      } else if (!capsLock.classList.contains('active') && !shiftLeft.classList.contains('active') && !shiftRight.classList.contains('active')) {
        changeRegisterDown();
      }
    } else if (keySpanValue.textContent === 'shift') {
      target.closest('.key').classList.add('active');
      changeRegisterUp();
      if (target.closest('.key').classList.add('active') && capsLock.classList.contains('active')) {
        changeRegisterUp();
      }
    } else if (keySpanValue.textContent === 'return') {
      textArea.value = `${textArea.value.substring(0, textArea.selectionStart)}\n${textArea.value.substring(textArea.selectionStart)}`;
      textArea.value += '\n';
    } else if (keySpanValue.textContent === 'delete') {
      const start = textArea.selectionStart;
      textArea.value = textArea.value.substring(0, textArea.selectionStart - 1)
      + textArea.value.substring(textArea.selectionStart);
      textArea.selectionStart = start - 1;
      textArea.selectionEnd = start - 1;
    } else if (keySpanValue.textContent === 'tab') {
      textArea.setRangeText('   ', textArea.selectionStart, textArea.selectionEnd, 'end');
      textArea.focus();
    } else if (keySpanValue.textContent === ' ') {
      textArea.setRangeText(' ', textArea.selectionStart, textArea.selectionEnd, 'end');
    } else if (keySpanValue.textContent === 'control') {
      textArea.value += '';
    } else if (keySpanValue.textContent === 'option') {
      textArea.value += '';
    } else if (keySpanValue.textContent === 'command') {
      textArea.value += '';
    } else textArea.value += keySpanValue.textContent;
  }
});

keybordWrapper.addEventListener('mouseup', (e) => {
  const { target } = e;
  if (target.closest('.key')) {
    const keySpanValue = getKeyValue(target);
    if (keySpanValue.textContent === 'shift') {
      target.closest('.key').classList.remove('active');
      if (!capsLock.classList.contains('active') && !shiftLeft.classList.contains('active') && !shiftRight.classList.contains('active')) {
        changeRegisterDown();
      }
      if (capsLock.classList.contains('active')) {
        changeCapsLock();
      } else changeRegisterDown();
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if (JSON.parse(localStorage.getItem('langEn'))) {
    langEn = false;
    changeLeng();
  } else {
    langEn = true;
    changeLeng();
  }
});
