//TODO: DO AI
const gameBoard = (() => {
	const winnerDiv = document.querySelector('#winnerDiv');
	winnerDiv.addEventListener('click', () => {
		winnerDiv.style.display = 'none';
	});
	const baseGridGameBoard = document.querySelector('#gridGameBoard');
	const gridGameBoard = [...document.querySelectorAll('.gameBoard')];
	let rounds = 0;
	const winner = playerNum => {
		winnerDiv.style.display = 'flex';
		winnerDiv.firstElementChild.textContent = `The winner is Player ${playerNum}!`;
		baseGridGameBoard.style.display = 'none';
	};
	const isGridFull = () => {
		return (
			arrGameBoard[0].every(val => val !== 0) &&
			arrGameBoard[1].every(val => val !== 0) &&
			arrGameBoard[2].every(val => val !== 0)
		);
	};
	const compareArrays = (arrayCompared, playerNum) => {
		if (arrayCompared.length === 0) return false;
		for (const value of arrayCompared) {
			if (value === playerNum) {
				continue;
			}
			return false;
		}
		return true;
	};
	const playsPlayerOne = () => {
		return rounds % 2 === 0;
	};
	let arrGameBoard = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	];
	const saveNewSelected = (currentGrid, playerNum, symbol, isEvent) => {
		isEvent
			? (currentGrid.target.textContent = symbol)
			: (currentGrid.textContent = symbol);
		const position = passIdToArrPosit(currentGrid,isEvent);
		arrGameBoard[+position[0]][+position[1]] = playerNum;
		rounds++;
	};
	const passIdToArrPosit = (e,isEvent) => {
		return isEvent? e.target.id.split(''): e.id.split('');
	}
	const resetGameBoard = () => {
		gridGameBoard.forEach(element => (element.textContent = ''));
		arrGameBoard = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		];
		winnerDiv.style.display = 'none';
		rounds = 0;
	};
	const addEventToGrids = func => {
		gridGameBoard.forEach(elem => {
			elem.removeEventListener('click', func);
			elem.addEventListener('click', func);
		});
	};
	const checkWinner = (playerNum, direction) => {
		console.log(arrGameBoard);
		switch (direction) {
			case 'hor': {
				for (let i = 0; i < 3; i++) {
					if (compareArrays(arrGameBoard[i], playerNum)) {
						return winner(playerNum);
					}
				}
				return playerNum === 2
					? checkWinner(playerNum, 'ver')
					: checkWinner(playerNum, 'ver') || checkWinner(playerNum + 1, 'hor');
			}
			case 'ver': {
				for (let i = 0; i < 3; i++) {
					const verArr = [
						arrGameBoard[0][i],
						arrGameBoard[1][i],
						arrGameBoard[2][i],
					];
					if (compareArrays(verArr, playerNum)) {
						return winner(playerNum);
					}
				}
				return checkWinner(playerNum, 'cross');
			}
			case 'cross': {
				let crossArr = [];
				for (let i = 0, j = 2; i < 3; i++, j--) {
					crossArr.push(arrGameBoard[i][j]);
				}
				if (compareArrays(crossArr, playerNum)) {
					return winner(playerNum);
				}
				crossArr = [];
				for (let i = 0; i < 3; i++) {
					crossArr.push(arrGameBoard[i][i]);
				}
				if (compareArrays(crossArr, playerNum)) {
					return winner(playerNum);
				}
				return false;
			}
		}
	};
	return {
		checkWinner,
		saveNewSelected,
		resetGameBoard,
		playsPlayerOne,
		winner,
		addEventToGrids,
		baseGridGameBoard,
		gridGameBoard,
		isGridFull,
	};
})();

(() => {
	const modeButtons = document.querySelectorAll('.selectModeButton');
	modeButtons.forEach(button => {
		button.addEventListener('click', e => {
			e.target.value === 'AI' ? selectedIA() : selected1V1();
			gameBoard.baseGridGameBoard.style.display = 'grid';
			gameBoard.resetGameBoard();
		});
	});
})();

function selectedIA() {
	gameBoard.addEventToGrids(e => {
		if (e.target.textContent === '') {
			gameBoard.saveNewSelected(e, 1, 'X',true);
			gameBoard.checkWinner(1, 'hor');
			const emptyGrids = gameBoard.gridGameBoard.filter(elem => {
				return elem.textContent === '';
			});
			const randomPosition = randomNum(emptyGrids.length);
			console.log(randomPosition)
			gameBoard.saveNewSelected(emptyGrids[randomPosition], 2, 'O',false);
			gameBoard.checkWinner(2, 'hor');
		} else if (gameBoard.isGridFull()) {
			gameBoard.winner('NO ONE!');
		}
	});
}
function randomNum(value) {
	return Math.floor(Math.random() * value);
}
function selected1V1() {
	gameBoard.addEventToGrids(e => {
		if (e.target.textContent === '') {
			console.log('hey!');
			if (gameBoard.playsPlayerOne()) {
				gameBoard.saveNewSelected(e, 1, 'X',true);
			} else {
				gameBoard.saveNewSelected(e, 2, '0',true);
			}
			gameBoard.checkWinner(1, 'hor');
		} else if (gameBoard.isGridFull()) {
			gameBoard.winner('NO ONE!');
		}
	});
}
