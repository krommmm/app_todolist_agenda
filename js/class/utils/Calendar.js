import { ICalendar } from "../interfaces/ICalendar.js";

export class Calendar extends ICalendar {
    constructor() {
        super();
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


} 