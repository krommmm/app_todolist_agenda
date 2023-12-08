import Storage from '../class/storage';
import GestionnaireLists from '../class/gestionnaireLists';
class DragAndDrop {
	constructor() {
		this.sortableList = document.getElementById('sortable-list');
		this.draggedItem = null;

		this.sortableList.addEventListener('dragstart', (e) =>
			this.dragstart(e)
		);
		this.sortableList.addEventListener('dragover', (e) => this.dragover(e));
		this.sortableList.addEventListener('drop', (e) => this.drop(e));
	}

	dragstart(event) {
		this.draggedItem = event.target;
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData('text/html', this.draggedItem.innerHTML);
	}
	dragover(event) {
		event.preventDefault();
	}
	drop(event) {
		event.preventDefault();
		if (event.target.classList.contains('text')) {
			let before = this.draggedItem;
			let after = event.target;
			let idBefore = this.draggedItem.closest('.container').dataset.id;
			let idAfter = after.closest('.container').dataset.id;

			let newStorage = new Storage();
			let myStorage = newStorage.getStorage();

			let indexBefore = '';
			let indexAfter = '';

			let arrayTypeList = [
				'todo',
				'work',
				'workToday',
				'wish',
				'course',
				'fetes',
			];
			arrayTypeList.forEach((type) => {
				let typeList = JSON.parse(localStorage.getItem('typeList'));
				if (typeList === type) {
					myStorage[type].forEach((item, index) => {
						if (item.id === idAfter) {
							indexAfter = index;
						}
						if (item.id === idBefore) {
							indexBefore = index;
						}
					});
					let savedListBefore = myStorage[type][indexBefore];
					let savedListAfter = myStorage[type][indexAfter];

					myStorage[type].splice(indexAfter, 1, savedListBefore);
					myStorage[type].splice(indexBefore, 1, savedListAfter);
					newStorage.setStorage(myStorage);
					new GestionnaireLists(typeList).afficherList();
				}
			});
		}
	}
}
export default DragAndDrop;
