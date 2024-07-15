import { IModalUI } from "../interfaces/IModalUI.js";

export class ModalUI extends IModalUI {
    constructor() {
        super();
    }

    open(selector) {
        document.querySelector(`.${selector}`).style.display = "flex";
    }

    close(selector) {
        document.querySelector(`.${selector}`).style.display = "none";
    }

    clearInputs() {
        document.querySelectorAll("input").forEach((input) => input.value = "");
    }

} 