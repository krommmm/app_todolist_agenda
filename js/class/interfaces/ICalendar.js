export class ICalendar {
    constructor() {
        if (new.target === ICalendar) {
            throw new TypeError("Cannot construct ICalendar instance directly.");
        }
    }

    turnLeft() {
        throw new Error("turnLeft isn't implemented yet.");
    }

    turnRight() {
        throw new Error("turnRight isn't implemented yet.");
    }

    selection() {
        throw new Error("selection isn't implemented yet.");
    }

    search() {
        throw new Error("search isn't implemented yet.");
    }

    createCalendarToUI() {
        throw new Error("createCalendarToUI isn't implemented yet.");
    }
}