import { ITaskListUI } from "../interfaces/ITaskListUI.js";

export class TaskListUI extends ITaskListUI {
    constructor(taskList) {
        super();
        this.taskList = taskList;
        this.container = document.getElementById("list_container");
        this.listContainer = document.getElementById("sortable-list");
    }

    updateBtnStyleToUI(e) {
        let btns = document.querySelectorAll('.btn');
        btns.forEach((btn) => {
            btn.classList.remove('btn-default');
            btn.classList.add('blue_light');
        });
        e.target.classList.remove('blue_light');
        e.target.classList.add('btn-default');
    }

    addTaskToUI(page, task, event) {
        const taskElement = document.createElement("div");
        taskElement.className = "container";
        taskElement.id = task.id;

        taskElement.setAttribute("data-id", task.id);

        const taskDescription = document.createElement("div");
        taskDescription.className = "description";

        // taskText
        const taskText = document.createElement("div");
        taskText.className = "text";
        taskText.setAttribute("draggable", "true");

        const taskPara = document.createElement("p");
        taskPara.className = "myText";
        taskPara.textContent = task.text;

        // ajout de la date ou non  ( si innactive dans le calendar alors pas de date, sinon date)



        const taskSpan = document.createElement("span");



        const taskIco = document.createElement("i");
        taskIco.className = "fa-solid fa-chevron-right open-task-option";


        // taskItem
        const taskItem = document.createElement("div");
        taskItem.className = "item";

        const iModify = document.createElement("i");
        iModify.className = "fa-regular fa-pen-to-square updateTask";

        const iDelete = document.createElement("i");
        iDelete.className = "fa-regular fa-trash-can deleteTask";

        taskItem.appendChild(iModify);
        taskItem.appendChild(iDelete);

        if (task.when !== undefined) {
            const date = task.when[0];
            const month = task.when[1];
            const year = task.when[2];

            const currentDateMS = new Date().getTime();
            const dateMS = new Date(year, month - 1, date);

            let realDate = '';
            let timeLeft = '';
            let myClass = '';
            if (
                task.when !== null &&
                task.when !== undefined
            ) {

                timeLeft = dateMS - currentDateMS;
            }
            timeLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
            let joursOuMois = 'jours';

            taskSpan.textContent = `${timeLeft} days`;
            if (timeLeft < 4) {
                myClass = 'timeLeft red';
            } else {
                myClass = 'timeLeft';
            }
            if (timeLeft > 31) {
                timeLeft = Math.round(timeLeft / 31);
                joursOuMois = 'mois';
                taskSpan.textContent = `${timeLeft} mois`;
            }
            if (timeLeft < 1 && timeLeft > -1) {
                timeLeft = 'today';
                joursOuMois = '';
                taskSpan.textContent = `Today`;
            }
            taskSpan.className = myClass;
            taskPara.appendChild(taskSpan);
        }

        taskText.appendChild(taskPara);
        taskText.appendChild(taskIco);

        taskDescription.appendChild(taskText);
        taskElement.appendChild(taskDescription);
        taskElement.appendChild(taskItem);

        this.listContainer.appendChild(taskElement);
    }

    deleteTaskFromUI(taskID) {
        const taskElement = document.getElementById(`${taskID}`);
        this.listContainer.removeChild(taskElement);
    }

    updateTaskFromUI(id, newText) {
        const taskElement = document.getElementById(`${id}`);
        taskElement.querySelector(".myText").textContent = newText;
    }

    openTaskOPtionsToUI(isClicked, event) {
        let container = event.target.closest(".container");
        if (isClicked) {
            container.querySelector('.item').style.transitionDuration = '0.5s';
            container.querySelector('.item').style.marginRight = '-200px';
            container.querySelector('.updateTask').style.transform =
                'rotate(360deg)';
            container.querySelector('.deleteTask').style.transform =
                'rotate(360deg)';
        } else {
            container.querySelector('.item').style.transitionDuration = '0.5s';
            container.querySelector('.item').style.marginRight = '0px';
            container.querySelector('.updateTask').style.transform =
                'rotate(-360deg)';
            container.querySelector('.deleteTask').style.transform =
                'rotate(-360deg)';
        }
    }

    async renderPageToUI(page) {
        this.container.innerHTML = `
        		<i class="fa-regular fa-calendar-days inactive"></i>
			<form class="input">
				<input
					class="myInput"
					type="text" 
					placeholder="Entrer une tâche"
				/>
				<i class="fa-solid fa-magnifying-glass"></i>
			</form>
			<div  id="sortable-list" class="list"></div>
        `;

        this.listContainer.innerHTML = "";
        this.listContainer = document.getElementById("sortable-list");
        const pageTasks = this.taskList.taskList[page].map((task) => task);
        pageTasks.forEach((task) => this.addTaskToUI(page, task))
    }
}