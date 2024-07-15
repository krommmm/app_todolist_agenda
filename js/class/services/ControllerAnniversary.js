export class ControllerAnniversary {
    constructor(anniversaryUI, modalUI) {
        this.anniversaryUI = anniversaryUI;
        this.modalUI = modalUI;
        this.currentPage = "toDo";
        this.id = parseInt(JSON.parse(localStorage.getItem("agenda-id"))) || 1;

        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener("click", this.handleClicks.bind(this));
    }

    handleClicks(e) {
        if (e.target.classList.contains("aniv")) {
            this.currentPage = "aniv";
            this.modalUI.close("modal-calendar");
            this.updateBtnStyle(e)
            this.displayAnniversary();
        } else if (e.target.classList.contains("add-aniv")) {
            this.modalUI.open("modal-add-birthDay");
        } else if (e.target.classList.contains("closeModalAnniv")) {
            this.modalUI.close("modal-add-birthDay");
        } else if (e.target.classList.contains("birthDay__img")) {
            this.configureBirthDayInfo(e);
            this.modalUI.open("modal-show-birthDay");
        } else if (e.target.classList.contains("closeModalAnnivUser")) {
            this.modalUI.close("modal-show-birthDay");
        } else if (e.target.classList.contains("birthDate-submit")) {
            this.addAnniversary(e);
            this.modalUI.close("modal-add-birthDay");
            this.modalUI.clearInputs("modal-add-birthDay");
        }
    }

    updateBtnStyle(e) {
        this.anniversaryUI.updateBtnStyleToUI(e);
    }

    displayAnniversary() {
        console.log(this.anniversaryUI.anniversaryList.anniversaryList);
        this.anniversaryUI.displayAnniversaryPageToUI();
        this.anniversaryUI.renderAnniversariesToUI();
        
    }

    addAnniversary(e) {
  
        const container = e.target.closest(".modal-add-birthDay__container");
        const prenom = container.querySelector(".birthDay-name");
        const nom = container.querySelector(".birthDay-firstName");
        const date = container.querySelector(".birthDay-date");
        const month = container.querySelector(".birthDay-month");
        const year = container.querySelector(".birthDay-year");
        const imgUrl = container.querySelector(".birthDay-imgUrl");

        const remainingDays = this.anniversaryUI.anniversaryList.getRemainingDays(date.value, month.value, year.value);
        const myAge = this.anniversaryUI.anniversaryList.culculateAge(date.value, month.value, year.value);
        const anniversary = {
            id: parseInt(this.id),
            prenom: prenom.value,
            nom: nom.value,
            date: date.value,
            month: month.value,
            year: year.value,
            age: myAge.age,
            today: myAge.today,
            imgUrl: imgUrl.value,
            remainingDays: remainingDays
        }
    

        this.anniversaryUI.anniversaryList.addAnniversary(anniversary);
        this.anniversaryUI.renderAnniversariesToUI();
        this.id++;
        localStorage.setItem("agenda-id",JSON.stringify(this.id));
     
    }

    configureBirthDayInfo(e) {
        const annivId = e.target.closest(".birthDay").dataset.id;
        const anniversary = this.anniversaryUI.anniversaryList.anniversaryList.find(aniv => parseInt(aniv.id) === parseInt(annivId));
        this.anniversaryUI.configureBirthDayInfoToUI(anniversary);
    }

}