const body = document.querySelector('.body')


let enKeybord = {
    firsSubRow: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'],
    firstRow: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete'],
    secondRow: ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', "\\"],
    thirdRow: ['caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'return'],
    fourthRow: ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift'],
    fifthRow: ['fn', 'control', 'option', 'command', '   ', 'command', 'option', ' ↑ ', ' ← ', ' ↓ ', ' → '],
}

let ruKeybord = {
    firsSubRow: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'],
    firstRow: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete'],
    secondRow: ['tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', "\\"],
    thirdRow: ['caps lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', "э", 'return'],
    fourthRow: ['shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'shift'],
    fifthRow: ['fn', 'control', 'option', 'command', '   ', 'command', 'option', ' ↑ ',' ← ', ' ↓ ', ' → '],
}
//['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+']
// let firstRow = ['~ `', '! 1', '@ 2', '# 3', '$ 4', '% 5', '^ 6', '& 7', '* 8', '( 9', ') 0', '_ -', '+ =', 'delete']
// let secondRow = ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', "\\"]
// let thirdRow = ['caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'return']
// let fourthRow = ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift']
// let fifthRow = ['fn', 'control', 'option', 'command', ' ', 'command', 'option', 'left', 'up', 'doun', 'right']

let wrapper = document.createElement('div');
wrapper.className = 'wrapper';

let header = document.createElement('h1');
header.className = 'header';
header.innerHTML = 'RSS Virtual Keyboard';

let textAria = document.createElement('textarea');
textAria.className = 'text-wrapper';
textAria.innerHTML = 'I am new teatAria look at me';

let keybord = document.createElement('div');
keybord.className = 'keybord-wrapper';

let discriptionOS = document.createElement('p');
discriptionOS.className = 'discription';
discriptionOS.innerHTML = `Клавиатура создана в операционной системе macOS.`;

let discriptionLG = document.createElement('p');
discriptionLG.className = 'discription';
discriptionLG.innerHTML = `Для переключения языка комбинация: левыe control + spase.`;




const createRow = function (row) {
    let newRow = document.createElement('div');
    newRow.className = 'keybord__row';

    let arrowWrapper = document.createElement('div');
    arrowWrapper.className = "arrow-wrapper"

    let temp = row.map((element, i) => {

        let key = document.createElement('div');

        let spanCaseUp = document.createElement('span');
        let spanCaseDown = document.createElement('span');
        let spanCapsLock = document.createElement('span');
        let spanCapsShift = document.createElement('span');

        element.length > 1 ? key.className = 'key special' : key.className = 'key';
        if (element === ' ↑ ' || 
            element === ' ← ' || 
            element === ' ↓ ' || 
            element === ' → ') {
            key.className = 'key special arrow'
        }

        spanCaseUp.className = 'key__case-up hide';
        spanCaseDown.className = 'key__case-down';
        spanCapsLock.className = 'key__capslock hide';
        spanCapsShift.className = 'key__capslock-shift hide';

        spanCaseUp.innerHTML = element.toUpperCase();
        spanCaseDown.innerHTML = element;
        spanCapsLock.innerHTML = element.toUpperCase();
        spanCapsShift.innerHTML = element;

        let isArrowWrapper = false

        key.append(spanCaseUp, spanCaseDown, spanCapsLock, spanCapsShift)
        if (key.classList.contains("arrow")) {
            arrowWrapper.append(key)
            console.log(arrowWrapper.children);
            isArrowWrapper = true
        }

        return isArrowWrapper === true ? arrowWrapper : key;

    });

    newRow.append(...temp);
    return newRow
}

const createKeybord = function (nodeElem, obj) {

    for (let key in obj) {
        nodeElem.insertAdjacentElement('beforeend', createRow(obj[key]));
    }
    return nodeElem
}
//console.log(createRow(firstRow));

body.insertAdjacentElement('afterbegin', wrapper)
wrapper.insertAdjacentElement('afterbegin', header);
wrapper.insertAdjacentElement('beforeend', textAria);
wrapper.insertAdjacentElement('beforeend', keybord);
wrapper.insertAdjacentElement('beforeend', discriptionOS);
wrapper.insertAdjacentElement('beforeend', discriptionLG);

createKeybord(keybord, enKeybord)

// keybord.insertAdjacentElement('beforeend', createRow(firstRow));
// keybord.insertAdjacentElement('beforeend', createRow(secondRow));
// keybord.insertAdjacentElement('beforeend', createRow(thirdRow));
// keybord.insertAdjacentElement('beforeend', createRow(fourthRow));
// keybord.insertAdjacentElement('beforeend', createRow(fifthRow));