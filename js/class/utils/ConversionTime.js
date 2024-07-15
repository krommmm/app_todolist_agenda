import { IConversionTime } from "../interfaces/IConversionTime.js";

export class ConversionTime extends IConversionTime {
    constructor() {
        super();
    }

    obtenirDateActuelle() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let numeroDay = date.getDate();
        return [numeroDay, month, year];
    }

    isThisYearBisextil(year) {
        if (
            (year % 4 === 0 && year % 100 !== 0) ||
            year % 400 === 0
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

    convertMoisEnLettre(convertionMonth, month) {
        let lesMoisObject = convertionMonth; // [janvier : 31]
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