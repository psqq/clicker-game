
let playerLocation = "Дом";

export function getPlayerLocation() {
    return playerLocation;
}

export function getNearLocation(loc) {
    return ["Улица", "Двор"];
}

export function getLocationName(loc) {
    return loc;
}

export function movePlayerTo(loc) {
    playerLocation = loc;
}
