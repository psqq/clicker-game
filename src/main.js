import * as ui from './ui';

let a, b, answer;

function newTask() {
    a = 5 + Math.floor(Math.random() * 5);
    b = a + Math.floor(Math.random() * 5);
    answer = a + b;
}


ui.output.printTag('p', 'Добро пожаловать в игру!');

function mainButtons() {
    ui.input.clear();
    newTask();
    ui.output.printTag('p', `Сколько будет ${a} + ${b}?`);
    let s = new Set();
    s.add(answer);
    while (s.size < 4) {
        s.add(5 + Math.floor(Math.random() * 15));
    }
    let arr = [...s];
    arr.sort(() => Math.random() - 0.5);
    for (let x of arr) {
        ui.input.addButton(x, () => {
            ui.output.printTag('p', `Ваш ответ: ${x}.`);
            if (x == answer) {
                ui.output.printTag('p', 'Верно!');
            }
            if (x != answer) {
                ui.output.printTag('p', 'Не верно!');
            }
            newTask();
            mainButtons();
        });
    }
}

mainButtons();
