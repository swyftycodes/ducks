// Explicitly define every element
const player1Lives = document.getElementById('player1Lives');
const player2Lives = document.getElementById('player2Lives');
const player1Shotgun = document.getElementById('player1Shotgun');
const player2Shotgun = document.getElementById('player2Shotgun');
const player1Monkey = document.getElementById('player1Monkey');
const player2Monkey = document.getElementById('player2Monkey');
const player1Duck = document.getElementById('player1Duck');
const player2Duck = document.getElementById('player2Duck');
const player1StatusDisplay = document.getElementById('player1StatusDisplay');
const player2StatusDisplay = document.getElementById('player2StatusDisplay');
const player1ItemsDisplay = document.getElementById('player1ItemsDisplay');
const player2ItemsDisplay = document.getElementById('player2ItemsDisplay');
const turnDisplay = document.getElementById('turnDisplay');
const loadedDisplay = document.getElementById('loadedDisplay');


function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function displayLives() {
	player1Lives.innerText = '⚡'.repeat(player1.lives);
	player2Lives.innerText = '⚡'.repeat(player2.lives);
}

function giveTurn(to = 'toggle') {
	if (to === 'toggle') {
		if (turn === 1) {
			turn = 2;
		} else if (turn === 2) {
			turn = 1;
		}
	} else {
		turn = to;
	}

	if (turn === 1) {
		player1Shotgun.style.visibility = 'visible';
		player2Shotgun.style.visibility = 'hidden';
	} else if (turn === 2) {
		player2Shotgun.style.visibility = 'visible'
		player1Shotgun.style.visibility = 'hidden';
	}
	turnDisplay.innerText = `player ${turn}'s turn`
}

function loadShotgun() {
	const options = ['duck', 'blank'];
	const amountToLoad = getRandomInt(3, 8);

	let shells = [];
	let ducks = 0;
	let blanks = 0;

	for (let i = 0; i < amountToLoad; i++) {
		let option = options[getRandomInt(0, 1)];
		if (option === 'duck') {
			ducks += 1;
		} else {
			blanks += 1;
		}

		shells.push(option);
	}

	shotgun = {
		shells: shells,
		ducks: ducks,
		blanks: blanks
	};

	loadedDisplay.innerText = `${shotgun.ducks} ducks, ${shotgun.blanks} blanks.`;
}

function shootSelf(playerWithGun) {
	// return if it's not the player's turn
	if (turn != playerWithGun) {
		console.log('not your turn');
		return;
	}
	// return if gun is empty
	if (shotgun.shells.length === 0) {
		console.log('gun is empty');
		return;
	}

	let damage = 1;
	if (isSawed === true) {
		damage = 2;
	}

	const shotShell = shotgun.shells[0];

	if (shotShell === 'duck') {
		if (playerWithGun === 1) {
			player1.lives -= damage;
			spinAnimation(1);

			if (player1.lives <= 0) {
				location = './player2win.html';
			}
		} else if (playerWithGun === 2) {
			player2.lives -= damage;
			spinAnimation(2);

			if (player2.lives <= 0) {
				location = './player1win.html';
			}
		}
	}

	if (playerWithGun === 1) {
		player1StatusDisplay.innerText = `You shot a ${shotShell} at yourself`;

		if (shotShell === 'duck') {
			if (player2.cuffed === true) {
				player2.cuffed = false;
			} else {
				giveTurn();
			}
		}
	} else if (playerWithGun === 2) {
		player2StatusDisplay.innerText = `You shot a ${shotShell} at yourself`;

		if (shotShell === 'duck') {
			if (player1.cuffed === true) {
				player1.cuffed = false;
			} else {
				giveTurn();
			}
		}
	}

	isSawed = false;

	displayLives();

	shotgun.shells.shift();

	if (shotgun.shells.length <= 0) {
		loadShotgun();
		giveItems();
	}
}

function shootOpponent(playerWithGun) {
	// return if it's not the player's turn
	if (turn != playerWithGun) {
		console.log('not your turn');
		return;
	}
	// return if gun is empty
	if (shotgun.shells.length === 0) {
		console.log('gun is empty');
		return;
	}

	let damage = 1;
	if (isSawed === true) {
		damage = 2;
	}

	const shotShell = shotgun.shells[0];

	if (shotShell === 'duck') {
		if (playerWithGun === 1) {
			player2.lives -= damage;
			shootOpponentAnimation(1);

			if (player2.lives <= 0) {
				location = './player1win.html';
			}
		} else if (playerWithGun === 2) {
			player1.lives -= damage;
			shootOpponentAnimation(2);

			if (player1.lives <= 0) {
				location = './player2win.html';
			}
		}
	}

	if (playerWithGun === 1) {
		player1StatusDisplay.innerText = `You shot a ${shotShell} at player 2`;

		if (player2.cuffed === true) {
			player2.cuffed = false;
		} else {
			giveTurn();
		}
	} else if (playerWithGun === 2) {
		player2StatusDisplay.innerText = `You shot a ${shotShell} at player 1`;

		if (player1.cuffed === true) {
			player1.cuffed = false;
		} else {
			giveTurn();
		}
	}

	isSawed = false;

	displayLives();

	shotgun.shells.shift();

	if (shotgun.shells.length <= 0) {
		loadShotgun();
		giveItems();
	}
}

function spinAnimation(player) {
	if (player === 1) {
		player1Monkey.style.animation = 'spin 1s linear';

		setTimeout(() => {
			player1Monkey.style.animation = '';
		}, 1000);
	} else if (player === 2) {
		player2Monkey.style.animation = 'spin 1s linear';

		setTimeout(() => {
			player2Monkey.style.animation = '';
		}, 1000);
	}
}

function shootOpponentAnimation(playerWithGun) {
	if (playerWithGun === 1) {
		player1Duck.style.visibility = 'visible';
		player1Duck.style.animation = 'duckShootLTR 1s linear';

		setTimeout(() => {
			player1Duck.style.animation = '';
			player1Duck.style.visibility = 'hidden';
			spinAnimation(2);
		}, 1000);
	} else if (playerWithGun === 2) {
		player2Duck.style.visibility = 'visible';
		player2Duck.style.animation = 'duckShootRTL 1s linear';

		setTimeout(() => {
			player2Duck.style.animation = '';
			player2Duck.style.visibility = 'hidden';
			spinAnimation(1);
		}, 1000);
	}
}

function giveItems() {
	const items = ['drugs', 'cuffs', 'saw', 'beer', 'glass'];

	for (let i = 0; i < 4; i++) {
		if (player1.items.length <= 8) {
			player1.items.push(items[getRandomInt(0, 4)]);
		}
		if (player2.items.length <= 8) {
			player2.items.push(items[getRandomInt(0, 4)]);
		}
	}

	displayItems();
}

function displayItems() {
	player1ItemsDisplay.innerHTML = '';
	player2ItemsDisplay.innerHTML = '';

	for (let i = 0; i < player1.items.length; i++) {
		let itemBtn = document.createElement('button');
		itemBtn.innerHTML = `<img width="30" src="./static/${player1.items[i]}.png">`
		itemBtn.onclick = () => {
			useItem(i, 1);
		}

		player1ItemsDisplay.appendChild(itemBtn);
	}

	for (let i = 0; i < player2.items.length; i++) {
		let itemBtn = document.createElement('button');
		itemBtn.innerHTML = `<img width="30" src="./static/${player2.items[i]}.png">`
		itemBtn.onclick = () => {
			useItem(i, 2);
		}

		player2ItemsDisplay.appendChild(itemBtn);
	}
}

function useItem(i, player) {
	if (turn != player) {
		console.log('not your turn');
		return;
	}

	if (player === 1) {
		const itemName = player1.items[i];

		if (itemName === 'drugs') {
			player1.lives += 1;
			displayLives();
		} else if (itemName === 'beer') {
			player1StatusDisplay.innerText = `You ejected a ${shotgun.shells[0]}`;
			shotgun.shells.shift();

			if (shotgun.shells.length <= 0) {
				loadShotgun();
				giveItems();
			}
		} else if (itemName === 'glass') {
			player1StatusDisplay.innerText = `The next shell is a ${shotgun.shells[0]}`;
		} else if (itemName === 'saw') {
			player1StatusDisplay.innerText = `The shotgun now does double damage`;
			isSawed = true;
		} else if (itemName === 'cuffs') {
			player1StatusDisplay.innerText = 'You cuffed player 2';
			player2.cuffed = true;
		}

		player1.items.splice(i, 1);
		displayItems();
	} else if (player === 2) {
		const itemName = player2.items[i];

		if (itemName === 'drugs') {
			player2.lives += 1;
			displayLives();
		} else if (itemName === 'beer') {
			player2StatusDisplay.innerText = `You ejected a ${shotgun.shells[0]}`;
			shotgun.shells.shift();

			if (shotgun.shells.length <= 0) {
				loadShotgun();
				giveItems();
			}
		} else if (itemName === 'glass') {
			player2StatusDisplay.innerText = `The next shell is a ${shotgun.shells[0]}`;
		} else if (itemName === 'saw') {
			player2StatusDisplay.innerText = `The shotgun now does double damage`;
			isSawed = true;
		} else if (itemName === 'cuffs') {
			player2StatusDisplay.innerText = 'You cuffed player 1';
			player1.cuffed = true;
		}

		player2.items.splice(i, 1);
		displayItems();
	}
}

let isSawed = false;

// game start
let player1 = {
	lives: 4,
	items: [],
	cuffed: false
}

let player2 = {
	lives: 4,
	items: [],
	cuffed: false
}
displayLives();

giveTurn(getRandomInt(1, 2));

let shotgun;
loadShotgun();

giveItems();
console.log(player1.items, player2.items);
