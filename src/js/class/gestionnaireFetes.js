import Year from './year';

class GestionnaireFetes {
	constructor(fetesList) {
		this.fetesList = fetesList;
		this.anniversaire = fetesList.anniversaire;
	}

	calculerAge(dateActuelleMs, dateAnivMs) {
		let age = (dateActuelleMs - dateAnivMs) / (1000 * 60 * 60 * 24 * 365);
		return age;
	}
	getCurrentDateMS(){
		let dateActuelleEnMs = new Year();
		let dateMoisAnnee = dateActuelleEnMs.obtenirDateActuelle();
		let dateActuelleMs =  new Date(
			dateMoisAnnee[2],
			dateMoisAnnee[1] - 1,
			dateMoisAnnee[0]
		);
		return dateActuelleMs;
	}
	getTempsRestantPourAnniversaire(dateMoisAnnee,aniv,dateActuelleMs){
		const UN_JOUR_EN_MILLISECONDS = 1000 * 60 * 60 * 24;
		let tempsRestantPourAniversaire =(new Date(dateMoisAnnee[2], aniv.date[1] - 1, aniv.date[0]) - dateActuelleMs) / (UN_JOUR_EN_MILLISECONDS);
		return tempsRestantPourAniversaire;
	}

	afficherAnniversaire() {
		let affichage = '';
		let dateActuelleEnMs = new Year();
		let dateMoisAnnee = dateActuelleEnMs.obtenirDateActuelle();
		let dateActuelleMs = this.getCurrentDateMS();

		this.anniversaire.forEach((aniv) => {
			let dateAnivMs = new Date(aniv.date[2], aniv.date[1], aniv.date[0]);
			let tempsRestantPourAniversaire = this.getTempsRestantPourAnniversaire(dateMoisAnnee, aniv, dateActuelleMs);
			let ageReel = this.calculerAge(dateActuelleMs, dateAnivMs);
			let age = Math.floor(ageReel);

		
			const isAnniversaireProche = tempsRestantPourAniversaire <= 31 && tempsRestantPourAniversaire > 0;
			
			const UNITEE_TEMPS = isAnniversaireProche ? 'jours' : '';
 			age = isAnniversaireProche ? Math.floor(ageReel) + 1 : Math.floor(ageReel);
			const VERBE = isAnniversaireProche ? 'aura' : 'a';
			const PREPOSITION = isAnniversaireProche ? 'dans' : '';
			const STYLE = isAnniversaireProche ? 'timeLeft red' : 'timeLeft minus';
			const TEMPS_RESTANT = isAnniversaireProche ? tempsRestantPourAniversaire : '';


			affichage += `
      <div class="container">
	      <div class="description">
	      	<div class="text">
			  <p><span class="dino">${aniv.prenom.toUpperCase()}</span> [${aniv.date[0]}/${
				aniv.date[1]
			}/${
				aniv.date[2]
			}]<span class="${STYLE}"> ${VERBE} ${age} ans ${PREPOSITION} ${TEMPS_RESTANT} ${UNITEE_TEMPS}</span></p>
	      	</div>
      	</div>
    </div>
      `;
		});

		return affichage;
	}
}
export default GestionnaireFetes;
