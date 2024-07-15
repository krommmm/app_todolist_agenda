export class ControllerCalendar {
    constructor(calendarUI, modalUI, modalAnimationUI) {
        this.calendarUI = calendarUI;
        this.modalUI = modalUI;
        this.modalAnimationUI = modalAnimationUI;
        this.cpt = 0;
        this.diapoContainer = "";
        this.nombreDeMois = this.diapoContainer.childElementCount;
        this.init();
    }

    init() {
        this.createCalendar();
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener("click", this.handleClicks.bind(this));
        document.addEventListener("keydown", this.handleKeydown.bind(this));
    }

    handleClicks(e) {
        if (e.target.classList.contains("fa-calendar-days")) {
            // openCalendar
            // this.modalUI.open("modal-calendar");
            this.modalAnimationUI.drop("modal-calendar");
            e.target.classList.remove("inactive");
        } else if (e.target.classList.contains("close-calendar")) {
            // close Calendar
            document.querySelector(".fa-calendar-days").classList.add("inactive");
            // this.modalUI.close("modal-calendar");
            this.modalAnimationUI.drop("modal-calendar");
        } else if (e.target.classList.contains("fa-angles-left")) {
            // turn left
            this.cpt = this.calendarUI.turnLeft(this.cpt);
        } else if (e.target.classList.contains("fa-angles-right")) {
            // turn right
            this.cpt = this.calendarUI.turnRight(this.cpt, this.nombreDeMois);
        } else if (e.target.classList.contains("joursSemaine")) {
            // selection
            this.selection(e);
        } else if (e.target.classList.contains("search")) {
            // search
            this.search(e);
            // this.modalUI.close("modal-calendar");
            this.modalAnimationUI.drop("modal-calendar");
        }
    }

    handleKeydown(e) {

    }
    selection(e) {
        let days = document.querySelectorAll('td');
        days.forEach((day) => {
            day.classList.remove('blue');
        });
        e.target.classList.add('blue');
        let container = e.target.closest('table').parentElement;
        let date = parseInt(e.target.textContent); // ex : 1 2 3
        let year = parseInt(container.querySelector('.paraYear').textContent);
        let month = container.querySelector('.paraMonth').textContent;
        month = this.calendarUI.conversionTime.convertMoisLettreEnInt(this.calendarUI.conversionTime, month);
        localStorage.setItem(
            'dateCalendar',
            JSON.stringify([date, month, year])
        );
    }

    search(e) {
        console.log(e.target.closest("#list_container"));
        // const date = JSON.parse(localStorage.getItem("dateCalendar"));
        // task.when = date;
        this.modalUI.close("modal-calendar");
    }


    createCalendar() {

        // OBTENTION DE LA DATE
        let dateActuelle = this.calendarUI.conversionTime.obtenirDateActuelle();
        let year = dateActuelle[2]; //int
        let month = dateActuelle[1]; //int
        let date = dateActuelle[0]; //int

        // CREATION NOUVELLE ANNEE
        // let newYear = new Year(year, month, date);
        let annéeDuDébut = year;


        // CREATION DU CONTAINER POUR METTRE TOUS LES DIAPOS DEDANS
        this.diapoContainer = document.createElement('div');
        this.diapoContainer.id = 'diapo_container';

        // CREATION DU CALENDRIER
        let total = '';
        for (let i = annéeDuDébut; i < annéeDuDébut + 3; i++) {


            let isBisextil = this.calendarUI.conversionTime.isThisYearBisextil(i);
            this.calendarUI.conversionTime.donnée.month.fevrier = isBisextil ? 29 : 28;

            for (let j = month; j < 13; j++) {
                let moisEnLettre = this.calendarUI.conversionTime.convertMoisEnLettre(this.calendarUI.conversionTime.donnée.month, j);
                let premierJourDuMois = this.calendarUI.conversionTime.obtenirDateDuMois(
                    year,
                    j,
                    1
                ); // 0 = lundi

                let containerTable = this.calendarUI.afficherCalendrier(i,
                    moisEnLettre,
                    premierJourDuMois,
                    this.calendarUI.conversionTime);

                total += containerTable;
                let div1 = document.createElement('div');
                div1.className = 'mois';
                div1.appendChild(containerTable);
                this.diapoContainer.appendChild(div1);
            }
            month = 1;
        }
        document.querySelector('.modal_content').appendChild(this.diapoContainer);

    }


}