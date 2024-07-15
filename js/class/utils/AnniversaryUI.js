import { IAnniversaryUI } from "../interfaces/IAnniversaryUI.js";

export class AnniversaryUI extends IAnniversaryUI {
    constructor(anniversaryList) {
        super();
        this.anniversaryList = anniversaryList;
        this.container = document.getElementById("list_container");
        this.anniversariesContainer = document.querySelector(".birthDays");
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

    addAnniversaryToUI(anniversary) {
        this.anniversariesContainer = document.querySelector(".birthDays");
        const anniversaryElement = document.createElement("div");
        anniversaryElement.className = "birthDay";
        anniversaryElement.id = anniversary.id;
        anniversaryElement.setAttribute("data-id", anniversary.id);

        const paraAnniversary = document.createElement("p");
        paraAnniversary.className = "birthDay__text";
        paraAnniversary.textContent = anniversary.remainingDays;

        const imgAnniversary = document.createElement("img");
        imgAnniversary.className = "birthDay__img";
        imgAnniversary.src = `${anniversary.imgUrl}`;

        anniversaryElement.appendChild(paraAnniversary);
        anniversaryElement.appendChild(imgAnniversary);

        this.anniversariesContainer.appendChild(anniversaryElement);
    }



    renderAnniversariesToUI() {
        // mise à jour des infos(remainingDays, age, today)
        this.anniversaryList.anniversaryList.forEach((anniv)=>{
            let remainingDays = this.anniversaryList.getRemainingDays(anniv.date, anniv.month, anniv.year);
            let myAge = this.anniversaryList.culculateAge(anniv.date, anniv.month, anniv.year);
            let age = myAge.age;
            let today = myAge.today;
            anniv.remainingDays = remainingDays;
            anniv.age = age;
            anniv.today = today;
        });


        this.anniversariesContainer = document.querySelector(".birthDays");
        this.anniversariesContainer.innerHTML = "";
        this.anniversaryList.anniversaryList.filter((anniv) => anniv.remainingDays > -1 && anniv.remainingDays <= 60).sort((a, b) => a.remainingDays - b.remainingDays).forEach((anniversary) => this.addAnniversaryToUI(anniversary));
    }

    configureBirthDayInfoToUI(anniversary) {
        const container = document.querySelector(".modal-show-birthDay__content");
        container.querySelector(".prenom").textContent = anniversary.prenom;
        container.querySelector(".nom").textContent = anniversary.nom;
        container.querySelector(".photoAnniv").src = anniversary.imgUrl;
        container.querySelector(".birthDayDate").textContent = `née le ${anniversary.date}/${anniversary.month}/${anniversary.year}`;
        container.querySelector(".birthDayWhen").textContent = anniversary.today ? `a ${anniversary.age} ans` : `aura ${anniversary.age} ans dans ${anniversary.remainingDays} jours`;
    }


    displayAnniversaryPageToUI() {
        this.container.innerHTML = "";
        this.container = document.getElementById("list_container");

        this.container.innerHTML = `
        <button class="btn add-aniv">Add anniv</button>
        <div class="birthDays">

        </div>

        <div class="modal-add-birthDay">
             <div class="modal-add-birthDay__container rtl">
             <div class="birthDay__container__header"><i class="fa-solid fa-circle-xmark closeModalAnniv"></i></div>
                 <input type="text" class="birthDay-name casuInput" placeholder="prenom"/>
                 <input type="text" class="birthDay-firstName casuInput" placeholder="nom"/>
                 <input type="text" class="birthDay-imgUrl casuInput" placeholder="url img" />
                 <div class="JMA">
                       <input type="number" class="birthDay-date" placeholder="date"/>
                       <input type="number" class="birthDay-month" placeholder="mois"/>
                       <input type="number" class="birthDay-year" placeholder="année"/>
                 </div>
                <div class="birthDate-submit btn">Entrer</div>
            </div>
        </div>
        <div class="modal-show-birthDay">
            <div class="modal-show-birthDay__content myModal">
                <div class="modal-show-birthDay__content__header">
                    <img class="photoAnniv" src="https://images.rtl.fr/~c/2000v2000/rtl/www/1329985-jean-lassalle-et-son-gilet-jaune-a-l-assemblee-nationale-le-21-novembre-2018.jpg" />
                       <div class="modal-show-birthDay__content__header__close__container"><i class="fa-solid fa-circle-xmark closeModalAnnivUser"></i></div>
                </div>
                <div class="modal-show-birthDay__content__body">
                    <p class="birthDayName"><span class="prenom"></span><span class="nom"></span></p>
                    <p class="birthDayDate">née le  20 juillet 1989</p>
                    <p class="birthDayWhen">aura 35 ans dans 6 jours</p>
                </div>
            </div>
        </div>
        `;
    }
}