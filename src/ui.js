
function scrollToBottom(el) {
    el.scrollTop = el.scrollHeight;
}

function clearSelection() {
    if(document.selection && document.selection.empty) {
        document.selection.empty();
    } else if(window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
}

class GameOutput {
    constructor(elSel) {
        this.elSel = elSel;
        /** @type {HTMLDivElement} */
        this.el = document.querySelector(elSel);
        this.sep = "";
    }
    clear() {
        this.el.innerHTML = '';
    }
    printEl(el) {
        this.el.appendChild(el);
        scrollToBottom(this.el);
    }
    printTag(tag, ...args) {
        const tagEl = document.createElement(tag);
        tagEl.innerHTML = args.join(this.sep);
        this.printEl(tagEl);
    }
}

class GameInput {
    constructor(elSel) {
        this.elSel = elSel;
        /** @type {HTMLDivElement} */
        this.el = document.querySelector(elSel);
    }
    clear() {
        this.el.innerHTML = '';
    }
    addEl(el) {
        this.el.appendChild(el);
    }
    addButton(name, callback) {
        const btnEl = document.createElement('span');
        btnEl.classList.add('text-button');
        btnEl.classList.add('no-selection');
        btnEl.innerText = name;
        btnEl.onclick = e => {
            callback(e);
        };
        this.addEl(btnEl);
    }
}

export const output = new GameOutput('.output');
export const tmpOutput = new GameOutput('.tmp-output');
export const input = new GameInput('.input');
