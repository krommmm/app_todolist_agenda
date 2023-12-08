class Storage {
	constructor() {
        this.storageArray = this.getStorage();
  
    }
	getStorage() {
		if (
			localStorage.getItem('lists') !== undefined &&
			localStorage.getItem('lists') !== null
		) {
			return JSON.parse(localStorage.getItem('lists'));
		} else if (
			localStorage.getItem('lists') === null ||
			localStorage.getItem('lists') === undefined
		) {
			let array = {
				todo: [],
				workToday: [],
				work: [],
				wish: [],
				course: [],
				fetes: [],
				aniv: [],
			};
			return array;
		}
	}
	setStorage(storageArray) {
		localStorage.setItem('lists', JSON.stringify(storageArray));
	}
}
export default Storage;
