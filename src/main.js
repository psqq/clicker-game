import * as ui from './ui';

ui.output.printTag('p', 'Добро пожаловать в игру!');

ui.input.addButton('Выйграть!', () => {
    ui.output.printTag('p', 'Вы выйграли!');
});
