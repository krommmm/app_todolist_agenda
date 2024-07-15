import { IAnniversaryList } from "../interfaces/IAnniversaryList.js";

export class AnniversaryList extends IAnniversaryList {
    constructor() {
        super();
        this.anniversaryList = JSON.parse(localStorage.getItem("agendarAnniversaries")) || [];
    }


    addAnniversary(anniversary) {
        this.anniversaryList.push(anniversary);
        localStorage.setItem("agendarAnniversaries", JSON.stringify(this.anniversaryList));
    }

    deleteAnniversary(anniversaryId) {
        this.anniversaryList = this.anniversaryList.filter(anniv => anniv.id !== anniversaryId)
    }

    getUserAnniversaryInFormat_dmy(date, month, year) {
        let userFormat_dmy = [date, month, year];
        return userFormat_dmy;
    }

    culculateAge(date, month, year) {
        const user = [parseInt(date), parseInt(month), parseInt(year)];
        const currentDate = new Date();
        let age = currentDate.getFullYear() - user[2];

        let today = false;

        if (currentDate.getMonth() + 1 > user[1]) {
            age = age + 2;
        } else if (currentDate.getMonth() + 1 === user[1] && currentDate.getDate() > user[0]) {
            age = age + 1;
        }
       
    


        if (currentDate.getMonth() + 1 === user[1] && currentDate.getDate() === user[0]) {
            today = true;
        }

        const myAge = {
            age: age,
            today: today
        }
        return myAge;
    }

    getRemainingDays(hisDate, hisMonth, hisYear) {
        const userFormat_dmy = this.getUserAnniversaryInFormat_dmy(hisDate, hisMonth, hisYear);
        let date = parseInt(userFormat_dmy[0]);
        let month = parseInt(userFormat_dmy[1]);
        let year = parseInt(userFormat_dmy[2]);
        let user = [date, month, year];

        //let currentDate = new Date();
        let currentDateMs = new Date().getTime();
        let currentYear = new Date().getFullYear();

        //let userDateString = new Date(currentYear,user[1]-1,user[0]).toString();
        let userDate = new Date(currentYear, user[1] - 1, user[0]);

        let userDateMs = userDate.getTime();


        let diffEnMs = userDateMs - currentDateMs;
        let remainingDays = 365 + Math.ceil(diffEnMs / (1000 * 3600 * 24));
        if (diffEnMs > 0) {
            remainingDays = Math.ceil(diffEnMs / (1000 * 3600 * 24));
        }
        if (user[0] === new Date().getDate() && user[1] - 1 === new Date().getMonth()) {
            remainingDays = 0;
        }

        return remainingDays;
    }

    updateAnniversary() {
        throw new Error("updateAnniversary isn't implemented yet.");
    }


}