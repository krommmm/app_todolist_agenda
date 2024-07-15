export class ITaskList {
    constructor() {
        if (new.target === ITaskList) {
            throw new TypeError("Cannot construct ITaskList instance directly.");
        }
    }

    addTask(task) {
        throw new Error("addTask isn't implemented yet.");
    }

    removeTask(taskId) {
        throw new Error("removeTask isn't implemented yet.");
    }

    updateTask(taskId, newText) {
        throw new Error("updateTask isn't implemented yet.");
    }

    renderPage(page) {
        throw new Error("displayPage isn't implemented yet.");
    }

}