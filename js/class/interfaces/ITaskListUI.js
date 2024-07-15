export class ITaskListUI {
    constructor() {
        if (new.target === ITaskListUI) {
            throw new TypeError("Cannot construct ITaskListUI instance directly.");
        }
    }

    updateBtnStyleToUI(e) {
        throw new Error("changerStyles isn't implemented yet.");
	}

    openTaskOPtionsToUI(isClicked, event){
        throw new Error("openTaskOptions isn't implemented yet.");
    }

    addTaskToUI(page,task){
        throw new Error("addTaskToUI isn't implemented yet.");
    }

    deleteTaskFromUI(taskID){
        throw new Error("deleteTaskFromUI isn't implemented yet.");
    }

    updateTaskFromUI(id,newText){
        throw new Error("updateTaskFromUI isn't implemented yet.");
    }

    renderPageToUI(page) {
        throw new Error("displayPage isn't implemented yet.");
    }

}