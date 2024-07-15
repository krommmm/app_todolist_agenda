export class IAnniversaryList {
    constructor() {
        if (new.target === IAnniversaryList) {
            throw new TypeError("Cannot construct IAnniversaryList instance direclty.");
        }
    }

    addAnniversary() {
        throw new Error("addAnniversary isn't implemented yet.");
    }

    deleteAnniversary() {
        throw new Error("deleteAnniversary isn't implemented yet.");
    }

    updateAnniversary() {
        throw new Error("updateAnniversary isn't implemented yet.");
    }

    renderAnniversaries() {
        throw new Error("renderAnniversaries isn't implemented yet.");
    }

    getUserAnniversaryInFormat_dmy(date,month,year){
        throw new Error("getUserAnniversaryInFormat_dmy isn't implemented yet.");
    }

    getRemainingDays(date,month,year){
        throw new Error("getRemainingDays isn't implemented yet.");
    }

    culculateAge(date,month,year){
        throw new Error("culculateAge isn't implemented yet.");
    }
}