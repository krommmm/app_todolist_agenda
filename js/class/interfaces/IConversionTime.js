export class IConversionTime {
    constructor() {
        if (new.target === IConversionTime) {
            throw new TypeError("Cannot construct IConversionTime instance directly.");
        }

        this.donnée = {
			
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
        throw error("obtenirDateActuelle isn't implemented yet.");
    }

    isThisYearBisextil() {
        throw error("isThisYearBisextil isn't implemented yet.");
    }

    obtenirDateDuMois(year, month, date) {
        throw error("obtenirDateDuMois isn't implemented yet.");
    }

    convertMoisEnLettre(newYear, month) {
        throw error("convertMoisEnLettre isn't implemented yet.");
    }

    convertMoisLettreEnInt(newYear, month) {
        throw error("convertMoisLettreEnInt isn't implemented yet.");
    }

}


