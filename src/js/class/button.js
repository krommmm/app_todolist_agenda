class Button {
	constructor() {}
	changerStyles(clickedElement) {
		let btns = document.querySelectorAll('.btn');
		btns.forEach((btn) => {
			btn.classList.remove('btn-default');
			btn.classList.add('blue_light');
		});
		clickedElement.classList.remove('blue_light');
		clickedElement.classList.add('btn-default');
	}
}

export default Button;
