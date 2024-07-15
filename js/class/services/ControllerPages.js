export class ControllerPages {
    constructor(taskListUI) {
        this.taskListUI = taskListUI;
        this.id = JSON.parse(localStorage.getItem("agenda-id")) || 1;
        this.currentPage = "toDo";
        this.isClicked = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.displayTasks("toDo");
    }

    bindEvents() {
        document.addEventListener("click", this.handleClicks.bind(this));
        document.addEventListener("keydown", this.handleKeydown.bind(this));
    }

    handleClicks(e) {
        if (e.target.classList.contains("toDo")) {
            this.currentPage = "toDo";
            this.updateBtnStyle(e)
            this.displayTasks("toDo");
        } else if (e.target.classList.contains("workToday")) {
            this.currentPage = "workToday";
            this.updateBtnStyle(e)
            this.displayTasks("workToday");
        } else if (e.target.classList.contains("work")) {
            this.currentPage = "work";
            this.updateBtnStyle(e)
            this.displayTasks("work");
        } else if (e.target.classList.contains("wish")) {
            this.currentPage = "wish";
            this.updateBtnStyle(e)
            this.displayTasks("wish");
        } else if (e.target.classList.contains("course")) {
            this.currentPage = "course";
            this.updateBtnStyle(e)
            this.displayTasks("course");
        } else if (e.target.classList.contains("fetes")) {
            this.currentPage = "fetes";
            this.updateBtnStyle(e)
            this.displayTasks("fetes");
        } else if (e.target.classList.contains("aniv")) {
            this.currentPage = "aniv";
            this.updateBtnStyle(e)
        } else if (e.target.classList.contains("open-task-option")) {
            this.openTaskOptions(e);
        } else if (e.target.classList.contains("deleteTask")) {
            this.deleteTask(e);
        } else if (e.target.classList.contains("updateTask")) {
            this.updateTask(e);
        }
    }

    deleteTask(e) {
        const taskId = e.target.closest(".container").dataset.id;
        this.taskListUI.taskList.removeTask(this.currentPage, taskId);
        localStorage.setItem("agenda-list", JSON.stringify(this.taskListUI.taskList.taskList));
        this.taskListUI.deleteTaskFromUI(taskId);
    }
    updateTask(e) {
        const taskId = e.target.closest(".container").dataset.id;
        const newText = prompt("Saisir une nouvelle tâche");
        this.taskListUI.taskList.updateTask(this.currentPage, taskId, newText);
        localStorage.setItem("agenda-list", JSON.stringify(this.taskListUI.taskList.taskList));
        this.taskListUI.updateTaskFromUI(taskId, newText);
    }


    openTaskOptions(e) {
        this.taskListUI.openTaskOPtionsToUI(this.isClicked, e)
        this.isClicked = !this.isClicked;
    }

    handleKeydown(e) {
        if (e.target.classList.contains("myInput") && e.key === "Enter") {
            e.preventDefault();
            this.addTask(e);
        }
    }

    displayTasks(page) {
        this.taskListUI.renderPageToUI(this.currentPage);
    }

    updateBtnStyle(e) {
        this.taskListUI.updateBtnStyleToUI(e);
    }

    async addTask(e) {
        const task = {
            id: parseInt(this.id),
            text: e.target.value,
        }
        this.taskListUI.taskList.addTask(this.currentPage, task);
        this.taskListUI.addTaskToUI(this.currentPage, this.taskListUI.taskList.taskList[this.currentPage].find(task => task.id === this.id));
        this.id++;
        localStorage.setItem("agenda-id", JSON.stringify(this.id));
        e.target.value = "";
    }

}

