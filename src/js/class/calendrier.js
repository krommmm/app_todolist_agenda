import Year from './year';

class Calendrier {
	constructor(year, mois, day, newYear) {
		this.year = year;
		this.mois = mois;
		this.day = day;
		this.joursSemaine = [
			'Lun.',
			'Mar.',
			'Mer.',
			'Jeu.',
			'Ven.',
			'Sam.',
			'Dim.',
		]; 
		this.newYear = newYear;
	}
	obtenirJoursDansLeMois() {
		return this.newYear.donnée.month[this.mois];
	}
	tournerAGauche(cpt) {
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
	tournerADroite(cpt,nombreDeMois) {
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
	afficherCalendrier() {
		const joursDansLeMois = this.obtenirJoursDansLeMois();
		const premierJourDuMois = this.day; // 2 soit mercredi
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
		let paraNode = document.createTextNode(`${this.mois}`);
		let paraNode2 = document.createTextNode(` ${this.year}`);
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
}
export default Calendrier;
