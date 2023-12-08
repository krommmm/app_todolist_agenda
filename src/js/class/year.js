// // janv, mars, mai, juillet, aout, octobre, decembre : 31
// // avril, juin, septembre, novembre : 30
// // février : 28
// //février année bisextille : 29

class Year {
	constructor(year, month, date) {
		this.year = year;
		this.month = month;
		this.date = date;
		this.donnée = {
			year: this.year,
			month: {
				janvier: 31,
				fevrier: 28,
				mars: 31,
				avril: 30,
				mai: 31,
				juin: 30,
				juillet: 31,
				aout: 31,
				septembre: 30,
				octobre: 31,
				novembre: 30,
				decembre: 31,
			},

			day: [
				'lundi',
				'mardi',
				'mercredi',
				'jeudi',
				'vendredi',
				'samedi',
				'dimanche',
			],
		};
	}

	obtenirDateActuelle() {
		let date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let numeroDay = date.getDate();
		return [numeroDay, month, year];
	}

	isThisYearBisextil() {
		if (
			(this.year % 4 === 0 && this.year % 100 !== 0) ||
			this.year % 400 === 0
		) {
			return true;
		} else {
			return false;
		}
	}
	obtenirDateDuMois(year, month, date) {
		let newDate = new Date(year, month - 1, date - 1);
		let premierJour = newDate.getDay();
		return premierJour;
	}
	convertMoisEnLettre(newYear, month) {
		let lesMoisObject = newYear.donnée.month; // [janvier : 31]
		let lesMoisArray = Object.keys(lesMoisObject);
		return lesMoisArray[month - 1];
	}
	convertMoisLettreEnInt(newYear, month) {
		let monthTab = Object.keys(newYear.donnée.month);

		for (let i = 0; i < monthTab.length; i++) {
			if (monthTab[i] === month) {
				return i + 1;
			}
		}
	}
}
export default Year;
