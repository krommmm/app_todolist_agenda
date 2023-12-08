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

	afficherAnniversaire() {
		let affichage = '';
		let dateActuelleEnMs = new Year();
		let dateMoisAnnee = dateActuelleEnMs.obtenirDateActuelle();

		let dateActuelleMs = new Date(
			dateMoisAnnee[2],
			dateMoisAnnee[1] - 1,
			dateMoisAnnee[0]
		);

		this.anniversaire.forEach((aniv) => {
			let dateAnivMs = new Date(
				aniv.date[2],
				aniv.date[1] - 1,
				aniv.date[0]
			);

			let tempsRestantPourAniversaire =
				(new Date(dateMoisAnnee[2], aniv.date[1] - 1, aniv.date[0]) -
					dateActuelleMs) /
				(1000 * 60 * 60 * 24);
			// let { unitéeTemps, age, a, isDans, myClass2, timeLeft } = this.infoAffichageAnniversaire(age, a, isDans, myClass2, timeLeft);
			let ageReel = this.calculerAge(dateActuelleMs, dateAnivMs);
			let age = Math.floor(ageReel);

			const unitéeTemps =
				tempsRestantPourAniversaire <= 31 &&
				tempsRestantPourAniversaire > 0
					? 'jours'
					: '';
			age =
				tempsRestantPourAniversaire <= 31 &&
				tempsRestantPourAniversaire > 0
					? Math.floor(ageReel) + 1
					: Math.floor(ageReel);
			const a =
				tempsRestantPourAniversaire <= 31 &&
				tempsRestantPourAniversaire > 0
					? 'aura'
					: 'a';
			const isDans =
				tempsRestantPourAniversaire <= 31 &&
				tempsRestantPourAniversaire > 0
					? 'dans'
					: '';
			const myClass2 =
				tempsRestantPourAniversaire <= 31 &&
				tempsRestantPourAniversaire > 0
					? 'timeLeft red'
					: 'timeLeft minus';
			const timeLeft =
				tempsRestantPourAniversaire <= 31 &&
				tempsRestantPourAniversaire > 0
					? tempsRestantPourAniversaire
					: '';

			affichage += `
      <div class="container">
	      <div class="description">
	      	<div class="text">
			  <p><span class="dino">${aniv.prenom.toUpperCase()}</span> [${aniv.date[0]}/${
				aniv.date[1]
			}/${
				aniv.date[2]
			}]<span class="${myClass2}"> ${a} ${age} ans ${isDans} ${timeLeft} ${unitéeTemps}</span></p>
	      	</div>
      	</div>
    </div>
      `;
		});

		return affichage;
	}
}
export default GestionnaireFetes;
