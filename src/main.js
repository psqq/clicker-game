import * as ui from './ui';
import * as w from './world';

ui.output.printTag('p', 'Добро пожаловать в игру!');

function mainButtons() {
    ui.input.clear();
    ui.input.addButton('Где я?', () => {
        const loc = w.getPlayerLocation();
        const locName = w.getLocationName(loc);
        ui.output.printTag('p', `Текущая локация: ${locName}`);
    });
    ui.input.addButton('Идти', () => {
        ui.input.clear();
        for(let loc of w.getNearLocation(w.getPlayerLocation())) {
            ui.input.addButton(w.getLocationName(loc), () => {
                w.movePlayerTo(loc);
                const locName = w.getLocationName(loc);
                ui.output.printTag('p', `Вы перешли в локацию: ${locName}`);
                mainButtons();
            });
        }
    });
}

mainButtons();
