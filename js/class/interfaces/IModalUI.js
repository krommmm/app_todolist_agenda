export class IModalUI {
    constructor() {
        if (new.target === IModalUI) {
            throw new TypeError("Cannot construct IModalUI instance directly.");
        }
    }

    open() {
        throw error("open isn't implemented yet.");
    }

    close() {
        throw error("close isn't implemented yet.");
    }

    clearInputs() {
        throw error("clearInputs isn't implemented yet.");
    }
    
}