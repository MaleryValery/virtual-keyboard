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
const upperCaseAll = document.querySelectorAll('.upper-case');
const lowerCaseAll = document.querySelectorAll('.lower-case');
const capsAll = document.querySelectorAll('.caps-lock');
const shiftCapsAll = document.querySelectorAll('.shift-caps');
const enLgAll = document.querySelectorAll('.enLg');
const ruLgAll = document.querySelectorAll('.ruLg');
let langEn = true;
let isCapsPressed;
let isControlPressed;
let isMetaPressed;
// let isOptionPressed;

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

function pressDown(e) {
  isCapsPressed = e.getModifierState('CapsLock');
  isControlPressed = e.getModifierState('Control');
  isMetaPressed = e.getModifierState('Meta');
  // isOptionPressed = e.getModifierState('Alt');
  console.log(e);
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
          e.preventDefault();
          textArea.setRangeText('   ', textArea.selectionStart, textArea.selectionEnd, 'end');
          textArea.focus();
          element.classList.add('active');
        } else if (e.key === 'Space') {
          textArea.setRangeText(' ', textArea.selectionStart, textArea.selectionEnd, 'end');
          textArea.focus();
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
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          textArea.value += ' ↓ ';
          element.classList.add('active');
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          textArea.value += ' ↑ ';
          element.classList.add('active');
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          textArea.value += ' ← ';
          element.classList.add('active');
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          textArea.value += ' → ';
          element.classList.add('active');
        } else if (isControlPressed && isMetaPressed) {
          changeLeng();
        }
        element.classList.add('active');
      }
    } else if (element.classList.contains(e.code)) {
      e.preventDefault();
      element.classList.add('active');
      const [activKey] = [...keysAll].filter((el) => el.classList.contains(e.code));
      const [activLg] = [...activKey.children].filter((el) => !el.classList.contains('hide'));
      const activReg = activLg.children;
      const [keySpan] = [...activReg].filter((el) => !el.classList.contains('hide'));
      const keySpanValue = keySpan.textContent;
      textArea.value += keySpanValue;
    }
  });
  textArea.focus();
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
        } else if (e.key === 'Space') {
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
    const [keyContainer] = [...target.closest('.key').children].filter((el) => !el.classList.contains('hide'));
    const keySpan = keyContainer.children;
    const [keySpanValue] = [...keySpan].filter((el) => !el.classList.contains('hide'));
    if (keySpanValue.textContent === 'caps lock') {
      isCapsPressed = true;
      target.closest('.key').classList.toggle('active');
      console.log('capslock');
      if (target.closest('.key').classList.contains('active')) {
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
      } else {
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
    } else if (keySpanValue.textContent === 'shift') {
      target.closest('.key').classList.add('active');
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
      if (target.closest('.key').classList.add('active') && isCapsPressed === true) {
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
    } else if (keySpanValue.textContent === 'return') {
      textArea.value = `${textArea.value.substring(0, textArea.selectionStart)}\n${textArea.value.substring(textArea.selectionStart)}`;
      textArea.value += '\n';
    } else if (keySpanValue.textContent === 'delete') {
      const start = textArea.selectionStart;
      textArea.value = textArea.value.substring(0, textArea.selectionStart - 1) +
        textArea.value.substring(textArea.selectionStart);
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

document.addEventListener('DOMContentLoaded', () => {
  if (JSON.parse(localStorage.getItem('langEn'))) {
    langEn = false;
    changeLeng();
  } else {
    langEn = true;
    changeLeng();
  }
});
