import { ModalUI } from "../utils/ModalUI.js"

export class ModalAnimationUI extends ModalUI{
    constructor(){
        super();
    }

    drop(selector){
        document.querySelector(`.${selector}`).classList.toggle("drop");
    }
}