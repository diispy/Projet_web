var jeu;

const joueur = 'O';
const IA = 'X';
const winCombos = [
	[10, 11, 12],
    [10, 21, 4],
    [10, 20, 30],
    [11, 12, 13],
    [11, 1, 5],
    [11, 0, 3],
    [12, 13, 14],
    [12, 2, 34],
    [12, 1, 4],
    [12, 0, 30],
    [13, 2, 5],
    [13, 1, 3],
    [14, 24, 34],
    [14, 2, 4],
	[20, 0, 1],
    [20, 3, 7],
    [20, 30, 40],
    [0, 4, 8],
    [0, 1, 2],
    [0, 3, 6],
    [1, 2, 24],
    [1, 5, 44],
    [1, 4, 7],
    [1, 3, 40],
    [2, 5, 8],
    [2, 4, 6],
    [24, 34, 44],
    [24, 5, 7],
    [30, 3, 4],
    [30, 6, 52],
    [30, 40, 50],
    [3, 7, 53],
    [3, 4, 5],
    [3, 6, 51],
    [4, 5, 34],
    [4, 8, 54],
    [4, 7, 52],
    [4, 6, 50],
    [5, 8, 53],
    [5, 7, 51],
    [34, 44, 54],
    [34, 8, 52],
    [40, 6, 7],
    [6, 7, 8],
    [7, 8, 44],
	[50, 51, 52],
    [51, 52, 53],
    [52, 53, 54]
]

const cells = document.querySelectorAll('.c');
startGame();

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	jeu = Array.from(Array(55).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
	if (typeof jeu[square.target.id] == 'number') {
		turn(square.target.id, joueur)
		if (!egalite()) turn(IAaction(), IA);
	}
}

function turn(squareId, player) {
	jeu[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(jeu, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == joueur ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == joueur ? "You win!" : "You lose.");
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function empty() 
{
    return jeu.filter(s => typeof s == 'number');
}

function IAaction() {
    return empty()[0];// test avec une IA jouant sur une case libre 
	//return minimax(jeu, IA).index; tentative d'utilsation de l'algo minimax loupé

}

function egalite() {
	if (empty().length == 0) {
		declareWinner("Tie Game!")
		return true;
    }
    //fonction ia peut plus jouer
	return false;
}
/*function minimax(newBoard, player) {
    var posautorise = new Array(0, 1, 2, 3 , 4, 5, 6, 7, 8);
    var availSpots = empty();
    var y=1;
    positionj= [40]
    var positionj;
    for (var i = 0; i < 9; i++) 
    {
        if(posautorise[i]===availSpots[y])
        {
            positionj[y] = posautorise[i];
            y++;
        }
    }

	if (checkWin(newBoard, joueur)) {
		return {score: -10};
	} else if (checkWin(newBoard, IA)) {
		return {score: 10};
	} else if (positionj.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < positionj.length; i++) {
		var move = {};
		move.index = newBoard[positionj[i]];
		newBoard[positionj[i]] = player;

		if (player == IA) {
			var result = minimax(newBoard, joueur);
			move.score = result.score;
        } 
        else {
			var result = minimax(newBoard, IA);
			move.score = result.score;
		}

		newBoard[positionj[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === IA) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}*///tentatives de réadaptation du minimax pour le morpion
