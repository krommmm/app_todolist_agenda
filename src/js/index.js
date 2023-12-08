import GestionnaireLists from './class/gestionnaireLists';
import Storage from './class/storage';
import { v4 as uuidv4 } from 'uuid';
import Year from './class/year';
import Calendrier from './class/calendrier';
import fetesList from './data/fetesList';
import GestionnaireFetes from './class/gestionnaireFetes';
import Button from '../js/class/button';



// AFFICHAGE LISTS AU DEBUT
window.addEventListener('load', function () {
	localStorage.setItem('typeList', JSON.stringify('todo'));
	let typeList = JSON.parse(localStorage.getItem('typeList'));
	document.querySelector('.toDo').classList.remove('blue_light');
	document.querySelector('.toDo').classList.add('btn-santa');
	let newList = new GestionnaireLists(typeList).afficherList();
});

// OBTENTION DE LA DATE
let newDate = new Year();
let dateActuelle = newDate.obtenirDateActuelle();
let year = dateActuelle[2]; //int
let month = dateActuelle[1]; //int
let date = dateActuelle[0]; //int

// CREATION NOUVELLE ANNEE
let newYear = new Year(year, month, date);
let annéeDuDébut = year;

// CREATION DU CONTAINER POUR METTRE TOUS LES DIAPOS DEDANS
let diapoContainer = document.createElement('div');
diapoContainer.id = 'diapo_container';

// CREATION DU CALENDRIER
let total = '';
for (let i = annéeDuDébut; i < annéeDuDébut + 3; i++) {
	let newYear = new Year(i, month, date);

	let isBisextil = newYear.isThisYearBisextil();
	newYear.donnée.month.fevrier = isBisextil ? 29 : 28;

	for (let j = month; j < 13; j++) {
		let moisEnLettre = new Year().convertMoisEnLettre(newYear, j);
		let premierJourDuMois = newYear.obtenirDateDuMois(
			newYear.donnée.year,
			j,
			1
		); // 0 = lundi
		let containerTable = new Calendrier(
			newYear.donnée.year,
			moisEnLettre,
			premierJourDuMois,
			newYear
		).afficherCalendrier();
		total += containerTable;
		let div1 = document.createElement('div');
		div1.className = 'mois';
		div1.appendChild(containerTable);
		diapoContainer.appendChild(div1);
	}
	month = 1;
}
document.querySelector('.modal_content').appendChild(diapoContainer);

/*---------- GESTION DES CLICKS-------------*/

document.addEventListener('click', (event) => {
	let clickedElement = event.target;
	if (clickedElement.classList.contains('aniv')) {
		let btns = document.querySelectorAll('.btn');
		btns.forEach((btn) => {
			btn.classList.remove('btn-santa');
			btn.classList.add('blue_light');
		});
		clickedElement.classList.remove('blue_light');
		clickedElement.classList.add('btn-santa');
		localStorage.setItem('typeList', JSON.stringify('aniv'));
		let typeList = JSON.parse(localStorage.getItem('typeList'));
		let aniv = new GestionnaireFetes(fetesList);
		let domListAniv = aniv.afficherAnniversaire();
		document.querySelector('.list').innerHTML = domListAniv;
	}
});

// ECOUTES DES BOUTONS POUR AFFICHER LES LISTS
let infos = [
	{ class: 'toDo', typeList: 'todo' },
	{ class: 'workToday', typeList: 'workToday' },
	{ class: 'work', typeList: 'work' },
	{ class: 'wish', typeList: 'wish' },
	{ class: 'course', typeList: 'course' },
	{ class: 'fetes', typeList: 'fetes' },
];
infos.forEach((info) => {
	document.addEventListener('click', (event) => {
		let clickedElement = event.target;
		if (clickedElement.classList.contains(`${info.class}`)) {
			try {
				new Button().changerStyles(clickedElement);
				localStorage.setItem(
					'typeList',
					JSON.stringify(`${info.typeList}`)
				);
				let typeList = JSON.parse(localStorage.getItem('typeList'));
				new GestionnaireLists(typeList).afficherList();
			} catch (err) {
				console.log(err);
			}
		}
	});
});

// UNLOCK MODIFY/DELETE + ANIMATION
let isClicked = false;
document.addEventListener('click', (event) => {
	let clickedElement = event.target;
	if (clickedElement.classList.contains('text')) {
		let container = clickedElement.closest('.container');
		if (!isClicked) {
			container.querySelector('.item').style.transitionDuration = '0.5s';
			container.querySelector('.item').style.marginRight = '0px';
			container.querySelector('.modify').style.transform =
				'rotate(-360deg)';
			container.querySelector('.delete').style.transform =
				'rotate(-360deg)';
			isClicked = true;
		} else if (isClicked) {
			container.querySelector('.item').style.transitionDuration = '0.5s';
			container.querySelector('.item').style.marginRight = '-200px';
			container.querySelector('.modify').style.transform =
				'rotate(360deg)';
			container.querySelector('.delete').style.transform =
				'rotate(360deg)';
			isClicked = false;
		}
	} else if (clickedElement.classList.contains('myText')) {
		let container = clickedElement.closest('.container');
		if (!isClicked) {
			container.querySelector('.item').style.transitionDuration = '0.5s';
			container.querySelector('.item').style.marginRight = '0px';
			container.querySelector('.modify').style.transform =
				'rotate(-360deg)';
			container.querySelector('.delete').style.transform =
				'rotate(-360deg)';
			isClicked = true;
		} else if (isClicked) {
			container.querySelector('.item').style.transitionDuration = '0.5s';
			container.querySelector('.item').style.marginRight = '-200px';
			container.querySelector('.modify').style.transform =
				'rotate(360deg)';
			container.querySelector('.delete').style.transform =
				'rotate(360deg)';
			isClicked = false;
		}
	}
});

let cpt = 0;
let nombreDeMois = diapoContainer.childElementCount;
// TOURNER A GAUCHE
document.addEventListener('click', (event) => {
	if (event.target.classList.contains('fa-angles-left')) {
		cpt = new Calendrier().tournerAGauche(cpt);
	}
});

// TOURNER A DROITE
document.addEventListener('click', (event) => {
	if (event.target.classList.contains('fa-angles-right')) {
		cpt = new Calendrier().tournerADroite(cpt, nombreDeMois);
	}
});

// FERMER AGENDA
document.addEventListener('click', (event) => {
	let clickedElement = event.target;
	if (clickedElement.classList.contains('close-calendar')) {
		document.querySelector('.modal').classList.add('hidden');
		let calendar = document.querySelector('.fa-calendar-days');
		if (!calendar.classList.contains('inactive')) {
			calendar.classList.add('inactive');
		}
	}
});

// INPUT TACHE
document.addEventListener('submit', (event) => {
	event.preventDefault();
	let texte = document.querySelector('.myInput');
	if (
		texte.value !== undefined &&
		texte.value !== null &&
		texte.value !== ''
	) {
		let storageArray = new Storage().getStorage();
		let newId = uuidv4();
		let typeList = JSON.parse(localStorage.getItem('typeList'));
		let listToDisplay = storageArray[typeList] || [];
		let calendar = document.querySelector('.fa-calendar-days');
		if (!calendar.classList.contains('inactive')) {
			let date = JSON.parse(localStorage.getItem('dateCalendar'));
			listToDisplay.push({ texte: texte.value, id: newId, date: date });
		} else if (calendar.classList.contains('inactive')) {
			listToDisplay.push({ texte: texte.value, id: newId });
		}
		new Storage().setStorage(storageArray);
		new GestionnaireLists(typeList).afficherList();

		texte.value = '';
	} else {
		texte.value = '';
	}
});

// SELECTION JOUR
document.addEventListener('click', (event) => {
	if (event.target.classList.contains('joursSemaine')) {
		let days = document.querySelectorAll('td');
		days.forEach((day) => {
			day.classList.remove('blue');
		});
		event.target.classList.add('blue');
		let container = event.target.closest('table').parentElement;
		let date = parseInt(event.target.textContent); // ex : 1 2 3
		let year = parseInt(container.querySelector('.paraYear').textContent);
		let month = container.querySelector('.paraMonth').textContent;
		month = convertMoisLettreEnInt(newYear, month);
		localStorage.setItem(
			'dateCalendar',
			JSON.stringify([date, month, year])
		);
	}
});

// MODIFY
document.addEventListener('click', (event) => {
	let clickedElement = event.target;
	if (clickedElement.classList.contains('modify')) {
		let myStorage = new Storage().getStorage();
		let container = clickedElement.closest('.container');
		let dataId = container.dataset.id;
		let newText = prompt('Quoi toi vouloir ajouter : ');
		let typeList = JSON.parse(localStorage.getItem('typeList'));
		if (newText !== undefined && newText !== null) {
			for (let i = 0; i < myStorage[typeList].length; i++) {
				if (myStorage[typeList][i].id === dataId) {
					myStorage[typeList][i].texte = newText;
					new Storage().setStorage(myStorage);

					new GestionnaireLists(typeList).afficherList();
				}
			}
		}
	}
});
// DELETE
document.addEventListener('click', (event) => {
	let clickedElement = event.target;
	if (clickedElement.classList.contains('delete')) {
		let myStorage = new Storage().getStorage();
		let container = clickedElement.closest('.container');
		let dataId = container.dataset.id;
		let typeList = JSON.parse(localStorage.getItem('typeList'));
		for (let i = 0; i < myStorage[typeList].length; i++) {
			if (myStorage[typeList][i].id === dataId) {
				myStorage[typeList].splice(i, 1);
				new Storage().setStorage(myStorage);
			}
		}

		let newList = new GestionnaireLists(typeList).afficherList();
	}
});

// SEARCH
document.addEventListener('click', (event) => {
	let clickedElement = event.target;
	if (clickedElement.classList.contains('search')) {
		document.querySelector('.modal').classList.add('hidden');
	}
});

// DESACTIVATION CALENDRIER
document.addEventListener('click', (event) => {
	let clickedElement = event.target;
	if (clickedElement.classList.contains('fa-calendar-days')) {
		if (clickedElement.classList.contains('inactive')) {
			clickedElement.classList.remove('inactive');
			document.querySelector('.modal').classList.remove('hidden');
		} else if (!clickedElement.classList.contains('inactive')) {
			clickedElement.classList.add('inactive');
		}
	}
});


// TRIER LES LISTS
document.addEventListener('DOMContentLoaded', function () {
	const sortableList = document.getElementById('sortable-list');
	let draggedItem = null;

	function dragStart(event) {
		draggedItem = event.target;
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData('text/html', draggedItem.innerHTML);
	}

	function dragOver(event) {
		event.preventDefault();
	}

	function drop(event) {
		event.preventDefault();
		if (event.target.classList.contains('text')) {
			let before = draggedItem;
			let after = event.target;
			let idBefore = draggedItem.closest('.container').dataset.id;
			let idAfter = after.closest('.container').dataset.id;

			let newStorage = new Storage();
			let myStorage = newStorage.getStorage();

			let indexBefore = '';
			let indexAfter = '';

			let typeList = JSON.parse(localStorage.getItem('typeList'));
			if (typeList === 'todo') {
				myStorage.todo.forEach((item, index) => {
					if (item.id === idAfter) {
						indexAfter = index;
					}
					if (item.id === idBefore) {
						indexBefore = index;
					}
				});
				let savedListBefore = myStorage.todo[indexBefore];
				let savedListAfter = myStorage.todo[indexAfter];

				myStorage.todo.splice(indexAfter, 1, savedListBefore);
				myStorage.todo.splice(indexBefore, 1, savedListAfter);
				newStorage.setStorage(myStorage);
				new GestionnaireLists(typeList).afficherList();
			} else if (typeList === 'workToday') {
				myStorage.workToday.forEach((item, index) => {
					if (item.id === idAfter) {
						indexAfter = index;
					}
					if (item.id === idBefore) {
						indexBefore = index;
					}
				});
				let savedListBefore = myStorage.workToday[indexBefore];
				let savedListAfter = myStorage.workToday[indexAfter];

				myStorage.workToday.splice(indexAfter, 1, savedListBefore);
				myStorage.workToday.splice(indexBefore, 1, savedListAfter);
				newStorage.setStorage(myStorage);
				new GestionnaireLists(typeList).afficherList();
			} else if (typeList === 'work') {
				myStorage.work.forEach((item, index) => {
					if (item.id === idAfter) {
						indexAfter = index;
					}
					if (item.id === idBefore) {
						indexBefore = index;
					}
				});
				let savedListBefore = myStorage.work[indexBefore];
				let savedListAfter = myStorage.work[indexAfter];

				myStorage.work.splice(indexAfter, 1, savedListBefore);
				myStorage.work.splice(indexBefore, 1, savedListAfter);
				newStorage.setStorage(myStorage);
				new GestionnaireLists(typeList).afficherList();
			} else if (typeList === 'wish') {
				myStorage.wish.forEach((item, index) => {
					if (item.id === idAfter) {
						indexAfter = index;
					}
					if (item.id === idBefore) {
						indexBefore = index;
					}
				});
				let savedListBefore = myStorage.wish[indexBefore];
				let savedListAfter = myStorage.wish[indexAfter];

				myStorage.wish.splice(indexAfter, 1, savedListBefore);
				myStorage.wish.splice(indexBefore, 1, savedListAfter);
				newStorage.setStorage(myStorage);
				new GestionnaireLists(typeList).afficherList();
			} else if (typeList === 'fetes') {
				myStorage.fetes.forEach((item, index) => {
					if (item.id === idAfter) {
						indexAfter = index;
					}
					if (item.id === idBefore) {
						indexBefore = index;
					}
				});
				let savedListBefore = myStorage.fetes[indexBefore];
				let savedListAfter = myStorage.fetes[indexAfter];

				myStorage.fetes.splice(indexAfter, 1, savedListBefore);
				myStorage.fetes.splice(indexBefore, 1, savedListAfter);
				newStorage.setStorage(myStorage);
				new GestionnaireLists(typeList).afficherList();
			} else if (typeList === 'course') {
				myStorage.course.forEach((item, index) => {
					if (item.id === idAfter) {
						indexAfter = index;
					}
					if (item.id === idBefore) {
						indexBefore = index;
					}
				});
				let savedListBefore = myStorage.course[indexBefore];
				let savedListAfter = myStorage.course[indexAfter];

				myStorage.course.splice(indexAfter, 1, savedListBefore);
				myStorage.course.splice(indexBefore, 1, savedListAfter);
				newStorage.setStorage(myStorage);
				new GestionnaireLists(typeList).afficherList();
			}
		}
	}

	sortableList.addEventListener('dragstart', dragStart);
	sortableList.addEventListener('dragover', dragOver);
	sortableList.addEventListener('drop', drop);
});