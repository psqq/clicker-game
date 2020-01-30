import { make } from "./tools";

class Location {
    constructor() {
        this.name = "location";
        /** @type {Set<Location>} */
        this.nearLocations = new Set();
    }
}

class Entity {
    constructor() {
        /** @type {Location} */
        this.location = null;
    }
}

/**
 * @param {Location} loc1 
 * @param {Location} loc2 
 */
function addWay(loc1, loc2) {
    loc1.nearLocations.add(loc2);
    loc2.nearLocations.add(loc1);
}

const homeLocation = make(Location, loc => {
    loc.name = "Дом";
});

const streetLocation = make(Location, loc => {
    loc.name = "Улица";
});

addWay(homeLocation, streetLocation);

let player = make(Entity, e => {
    e.location = homeLocation;
});

export function getPlayerLocation() {
    return player.location;
}

/**
 * @param {Location} loc
 */
export function getNearLocations(loc) {
    return [...loc.nearLocations];
}

/**
 * @param {Location} loc
 */
export function getLocationName(loc) {
    return loc.name;
}

/**
 * @param {Location} loc
 */
export function movePlayerTo(loc) {
    player.location = loc;
}
