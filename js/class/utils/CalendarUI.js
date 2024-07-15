import { ICalendarUI } from "../interfaces/ICalendarUI.js";

export class CalendarUI extends ICalendarUI {
    constructor(calendar, conversionTime) {
        super();
        this.calendar = calendar;
        this.conversionTime = conversionTime;
        this.joursSemaine = [
			'Lun.',
			'Mar.',
			'Mer.',
			'Jeu.',
			'Ven.',
			'Sam.',
			'Dim.', 
		];
    }

    turnLeftToUI() {
        throw new Error("turnLeftToUI isn't implemented yet.");
    }

    turnRightToUI() {
        throw new Error("turnRightToUI isn't implemented yet.");
    }

    selectionToUI() {
        throw new Error("selectionToUI isn't implemented yet.");
    }

    searchToUI() {
        throw new Error("searchToUI isn't implemented yet.");
    }

    obtenirJoursDansLeMois(mois) {
		return this.conversionTime.donnée.month[mois];
	}

    afficherCalendrier(year, mois, day, newYear) {
        
		// cacher les jours avant la date actuel
		let dateActuelle = this.conversionTime.obtenirDateActuelle();
		let listMois = this.conversionTime.donnée.month;
		 
		let moisActuelleEnLettre = Object.keys(listMois).filter((item,index)=>index===dateActuelle[1]-1)[0];
		

		const joursDansLeMois = this.obtenirJoursDansLeMois(mois);
		const premierJourDuMois = day; // 2 soit mercredi
		const nbLignes = 6;
		let cpt = 0;
		let cpt2 = 1;

		let container = document.createElement('div');
		container.className = 'containerCalendar';

		let divPara = document.createElement('div');
		divPara.className = 'divPara';
		let para = document.createElement('p');
		let para2 = document.createElement('p');

		para.className = 'paraMonth';
		para2.className = 'paraYear';
		let paraNode = document.createTextNode(`${mois}`);
		let paraNode2 = document.createTextNode(` ${year}`);
		para.appendChild(paraNode);
		para2.appendChild(paraNode2);
		divPara.appendChild(para);
		divPara.appendChild(para2);
		container.appendChild(divPara);

		let table = document.createElement('table');
		let thead = document.createElement('thead');
		let tr = document.createElement('tr');
		this.joursSemaine.forEach((jourSemaine) => {
			let th = document.createElement('th');
			let thNode = document.createTextNode(`${jourSemaine}`);
			th.appendChild(thNode);
			tr.appendChild(th);
		});

		thead.appendChild(tr);
		table.appendChild(thead);

		for (let i = 0; i < nbLignes; i++) {
			let tr = document.createElement('tr');
			for (let j = 0; j < this.joursSemaine.length; j++) {
				let td = document.createElement('td');

				let tdNode;
				if (cpt < premierJourDuMois || cpt2 > joursDansLeMois) {
					tdNode = document.createTextNode(``);
				} else {
					
					tdNode = document.createTextNode(`${cpt2}`);
					td.className = 'joursSemaine';
					if (cpt2 < dateActuelle[0] && mois === moisActuelleEnLettre && year === dateActuelle[2]) {
						td.className = ' outDated';
					}
					cpt2++;
				}
				cpt++;

				td.appendChild(tdNode);
				tr.appendChild(td);
			}

			table.appendChild(tr);
			container.appendChild(table);
		}
		return container;
	}

    turnLeft(cpt) {
		if (cpt <= 0) {
			return cpt;
		}
		cpt--;

		var largeurElement = document.querySelector('.mois').offsetWidth;
		let largeur = -largeurElement;
		document.getElementById(
			'diapo_container'
		).style.transform = `translateX(${largeur * cpt}px)`;

		return cpt;
	}

    turnRight(cpt, nombreDeMois) {
		cpt++;
		if (cpt === nombreDeMois) {
			return cpt - 1;
		}
		var largeurElement = document.querySelector('.mois').offsetWidth;
		let largeur = -largeurElement;
		document.getElementById(
			'diapo_container'
		).style.transform = `translateX(${largeur * cpt}px)`;

		return cpt;
	}
}