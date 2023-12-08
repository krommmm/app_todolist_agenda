import Storage from './storage';

class GestionnaireLists {
	constructor(typeList) {
		this.typeList = typeList;
	}
    afficherList(){
        let affichage = '';
        let storageArray = new Storage().getStorage();
        let listToDisplay = storageArray[this.typeList] || {
            todo: [],
            workToday: [],
            work: [],
            wish: [],
            course: [],
            fetes: [],
        };
    
        let today = new Date();
    
        for (let i = 0; i < listToDisplay.length; i++) {
            let realDate = '';
            let timeLeft = '';
            let myClass = '';
            if (
                listToDisplay[i].date !== null &&
                listToDisplay[i].date !== undefined
            ) {
                realDate = new Date(
                    listToDisplay[i].date[2],
                    listToDisplay[i].date[1] - 1,
                    listToDisplay[i].date[0]
                );
                timeLeft = realDate - today;
            }
            timeLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
            let joursOuMois = 'jours';
    
            if (timeLeft < 4) {
                myClass = 'timeLeft red';
            } else {
                myClass = 'timeLeft';
            }
            if (timeLeft > 31) {
                timeLeft = Math.round(timeLeft / 31);
                joursOuMois = 'mois';
            }
            if (timeLeft < 1 && timeLeft > -1) {
                timeLeft = 'today';
                joursOuMois = '';
            }
            if (
                listToDisplay[i].date !== null &&
                listToDisplay[i].date !== undefined
            ) {
                affichage += `
        <div class="container" data-id="${listToDisplay[i].id}">
        <div class="description">
          <div  draggable="true" class="text">
          <p  class="myText">${listToDisplay[i].texte} <span class="${myClass}"> ${timeLeft} ${joursOuMois}</span></p>
          <i class="fa-solid fa-chevron-right"></i>
          </div>
        </div>
        <div class="item">
        <i class="fa-regular fa-pen-to-square modify"></i
        ><i class="fa-regular fa-trash-can delete"></i>
        </div>
      </div>
        `;
            } else {
                affichage += `
            <div  class="container" data-id="${listToDisplay[i].id}">
            <div  class="description">
              <div draggable="true" class="text">
              <p  class="myText">${listToDisplay[i].texte}</p>
              <i class="fa-solid fa-chevron-right"></i>
              </div>
            </div>
            <div class="item">
            <i class="fa-regular fa-pen-to-square modify"></i
            ><i class="fa-regular fa-trash-can delete"></i>
            </div>
          </div>
            `;
            }
        }
    
        document.querySelector('.list').innerHTML = affichage;
    }
}

export default GestionnaireLists;

// return le container au lieu de l'afficher
