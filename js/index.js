import { ControllerPages } from "./class/services/ControllerPages.js";
import { ControllerAnniversary } from "./class/services/controllerAnniversary.js";
import { TaskListUI } from "./class/utils/TaskListUI.js";
import { TaskList } from "./class/utils/TaskList.js";
import { AnniversaryUI } from "./class/utils/AnniversaryUI.js";
import { ModalUI } from "./class/utils/ModalUI.js";
import { AnniversaryList } from "./class/utils/AnniversaryList.js";
import { ControllerCalendar } from "./class/services/ControllerCalendar.js";
import { Calendar } from "./class/utils/Calendar.js";
import { CalendarUI } from "./class/utils/CalendarUI.js";
import { ConversionTime } from "./class/utils/ConversionTime.js";
import { ModalAnimationUI } from "./class/extends/ModalAnimation.js";


document.addEventListener("DOMContentLoaded", () => {

    const modalUI = new ModalUI();
    const taskList = new TaskList();
    const anniversaryList = new AnniversaryList();
    const conversionTime = new ConversionTime();
    const modalAnimationUI = new ModalAnimationUI();

    const anniversaryUI = new AnniversaryUI(anniversaryList);
    const taskListUi = new TaskListUI(taskList);
    const calendar = new Calendar();
    const calendarUI = new CalendarUI(calendar, conversionTime);

    new ControllerPages(taskListUi);
    new ControllerAnniversary(anniversaryUI, modalUI);
    new ControllerCalendar(calendarUI, modalUI, modalAnimationUI);
});