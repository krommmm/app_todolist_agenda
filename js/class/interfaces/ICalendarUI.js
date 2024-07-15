export class ICalendarUI {
    constructor() {
        if (new.target === constructor) {
            throw new TypeError("Cannot construct constructor instance directly.");
        }
    }

    turnLeftToUI() {
        throw new Error("turnLeftToUI isn't implemented yet.");
    }

    turnRightToUI() {
        throw new Error("turnRightToUI isn't implemented yet.");
    }

    selectionToUI() {
        throw new Error("selectionToUI isn't implemented yet.");
    }

    searchToUI() {
        throw new Error("searchToUI isn't implemented yet.");
    }
}