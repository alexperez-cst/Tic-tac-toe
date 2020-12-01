//We have to create a iife that creates the gameboard and returns an object with some functionalities.
//later we have to create a factory that creates two objects. aka two players.

//the gameBoard is a grid with divs, that all of these have a eventListener, that, if the div is not selected, print an X or Y seeing the num of games, if is odd print an 0 (plays the second player), if not print an x, that is the first. If the div is selected nothing happens;

//Every round, the gameboard check if there are a winner, if it is, the game stops and shows up the winner.

//The selected 'cases' are going to store on a multidimensional array, that is used to comprove the winner.

//If there is a winner, a button show up saying if you want to play again.

//TODO: DO AI
//TODO: fix the bug when the game ends
//TODO:
const game = () => {
	const gameBoard = (() => {
		const winnerDiv = document.querySelector('#winnerDiv');
		const baseGridGameBoard = document.querySelector('#gridGameBoard');
		const gridGameBoard = document.querySelectorAll('.gameBoard');
		gridGameBoard.forEach(element => element.textContent = '');
		const winner = playerNum => {
			winnerDiv.addEventListener(
				'click',
				() => {
					winnerDiv.style.display = 'none';
					arrGameBoard =
					game();
				},
				{ once: true },
			);
			winnerDiv.style.display = 'flex';
			winnerDiv.firstElementChild.textContent = `The winner is Player ${playerNum}!`;
			baseGridGameBoard.style.display = 'none';
		};
		const isGridFull = () =>{
		if (
				(arrGameBoard[0].reduce((total,val) => total++,0)===3) &&
				(arrGameBoard[1].reduce((total,val) => total++,0)=== 3) &&
				(arrGameBoard[2].reduce((total,val) => total++,0) === 3)
			) {
				return true
			}
		}
		const compareArrays = (arrayCompared,playerNum) => {
			if(arrayCompared.length === 0) return false;
			for(const value of arrayCompared){
				if(value === playerNum) {continue;}
				return false;
			}
			return true;
		}
		const playsPlayerOne = rounds => rounds % 2 === 0;
		const arrGameBoard = [[], [], []];
		const checkWinner = (playerNum, direction) => {
			console.log(arrGameBoard)
			if(isGridFull()){
				return winner('NO ONE!')
			}
				switch (direction) {
					case 'hor': {
						for (let i = 0; i < 3; i++) {
							if (compareArrays(arrGameBoard[i],playerNum)) {
								return winner(playerNum);
							}
						}
						return playerNum === 2
							? checkWinner(playerNum, 'ver')
							: checkWinner(playerNum, 'ver') ||
									checkWinner(playerNum + 1, 'hor');
					}
					case 'ver': {
						for (let i = 0; i < 3; i++) {
							const verArr = [
								arrGameBoard[0][i],
								arrGameBoard[1][i],
								arrGameBoard[2][i],
							];
							if (compareArrays(verArr,playerNum)) {
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
						if (compareArrays(crossArr,playerNum)) {
							return winner(playerNum);
						}
						crossArr = [];
						for (let i = 0; i < 3; i++) {
							crossArr.push(arrGameBoard[i][i]);
						}
						if (compareArrays(crossArr,playerNum)) {
							return winner(playerNum);
						}
						return false;
					}
				}
		};
		return { checkWinner, arrGameBoard, playsPlayerOne, gridGameBoard,baseGridGameBoard, isGridFull};
	})();
	(() => {
		const modeButtons = document.querySelectorAll('.selectModeButton');
		modeButtons.forEach(button => {
			button.addEventListener(
				'click',
				e => {
					console.log(e.target.value)
					e.target.value === 'IA' ? selectedIA() : selected1V1();
					gameBoard.baseGridGameBoard.style.display = 'grid';
				},
				{ once: true },
			);
		});
	})();

	function selectedIA() {
		let rounds = 0;
		const passIdToArrPosit = e => e.target.id.split('');
		gameBoard.gridGameBoard.forEach(elem => {
			elem.addEventListener('click', e => {
				if (e.target.textContent === '') {
					const position = passIdToArrPosit(e);
					if (gameBoard.playsPlayerOne(rounds)) {
						e.target.textContent = 'X';
						gameBoard.arrGameBoard[+position[0]][+position[1]] = 1;
					} else {
					}
					rounds++;
					checkWinner(1, 'hor');
				}
			});
		});
	}
	function selected1V1() {
		console.log('there');
		let rounds = 0;
		const passIdToArrPosit = e => e.target.id.split('');
		gameBoard.gridGameBoard.forEach(elem => {
			elem.addEventListener('click', e => {
				if (e.target.textContent === '') {
					const position = passIdToArrPosit(e);
					if (gameBoard.playsPlayerOne(rounds)) {
						e.target.textContent = 'X';
						gameBoard.arrGameBoard[+position[0]][+position[1]] = 1;
					} else {
						e.target.textContent = 'O';
						gameBoard.arrGameBoard[+position[0]][+position[1]] = 2;
					}
					rounds++;
					gameBoard.checkWinner(1, 'hor');
				}
				gameBoard.isGridFull();
			});
		});
	}
};
game();
