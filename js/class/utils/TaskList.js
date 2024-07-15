import { ITaskList } from "../interfaces/ITaskList.js";

export class TaskList extends ITaskList {
    constructor() {
        super();
        this.taskList = JSON.parse(localStorage.getItem("agenda-list")) || {
            toDo: [],
            workToday: [],
            work: [],
            wish: [],
            course: [],
            fetes: []
        }
    }

     addTask(page, task) {
        let calendar = document.querySelector(".fa-calendar-days");
        if (!calendar.classList.contains("inactive")) {
            const date =  JSON.parse(localStorage.getItem("dateCalendar"));
            task.when = date;
        }
        this.taskList[page].push(task);
        localStorage.setItem("agenda-list", JSON.stringify(this.taskList));
    }

    removeTask(page, taskId) {
        this.taskList[page] = this.taskList[page].filter(task => parseInt(task.id) !== parseInt(taskId));
    }

    updateTask(page, taskId, newText) {
        const searchedTask = this.taskList[page].find((task) => parseInt(task.id) === parseInt(taskId));
        searchedTask.text = newText;
    }

    renderPage(page) {
        console.log(page);
    }

}