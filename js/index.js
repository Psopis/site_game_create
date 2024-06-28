class Player {
	constructor() {
		this.play = false;

		this.onTop = true;
		this.onLeft = true;

		this.playerScore = 0;
		this.playerLives = 3;

		this.livesCouneter = document.getElementById('lives-count');
		this.scoreCounter = document.getElementById('player-score');
		this.playerSprite = document.getElementById('catcher-sprite');

		this.coinStates = [0, 0, 0, 0];
		this.launcherIds = ["br", "bl", "tr", "tl"];

		this.activeLauncherIndex = 0

	}

	updateScoreCounter() {
		this.scoreCounter.innerHTML = this.playerScore;
	}
	increaseScore() {
		this.playerScore += 1;
		this.updateScoreCounter();
	}

	updateLivesCounter() {
		this.livesCouneter.innerHTML = this.playerLives;
	}
	decreaseLives() {
		if (this.playerLives) {
			this.playerLives -= 1;
		}
		if (!this.playerLives) {
			this.play = false;

			document.getElementById("game-over-dialog").showModal();
		}
		this.updateLivesCounter();

	}

	movePlayerSprite() {
		if (this.onTop) {
			this.playerSprite.src = './img/man_top.png'
			this.playerSprite.style.removeProperty('bottom');
			this.playerSprite.style.top = '0px';
		} else {
			this.playerSprite.src = './img/man_down.png'
			this.playerSprite.style.removeProperty('top');
			this.playerSprite.style.bottom = '0px';
		}
		if (this.onLeft) {
			this.playerSprite.style.transform = 'scale(1, 1)';
			this.playerSprite.style.removeProperty('right');
			this.playerSprite.style.left = '0px';
		} else {
			this.playerSprite.style.transform = 'scale(-1, 1)';
			this.playerSprite.style.removeProperty('left');
			this.playerSprite.style.right = '0px';
		}

	}
	getPlayerIndex(onTop, onLeft) {
		let playerIndex = 0;
		playerIndex = playerIndex | onTop;
		playerIndex = playerIndex << 1;
		playerIndex = playerIndex | onLeft;
		return parseInt(playerIndex);
	}

	updatePlayerPosition(onTop, onLeft) {
		this.onTop = onTop;
		this.onLeft = onLeft;
		this.movePlayerSprite();
	}

	moveCoinSprite(launcherIndex) {
		let activeCoin = document.getElementById(this.launcherIds[launcherIndex]).getElementsByClassName("coin-sprite")[0];
		let activeCoinState = this.coinStates[launcherIndex];
		activeCoin.style.top = activeCoinState.toString() + "%";
		if (launcherIndex === 1 || launcherIndex === 3) {
			activeCoin.style.left = (activeCoinState * 10).toString() + "%";
			activeCoin.style.transform = "rotate(" + activeCoinState.toString() + "rad)";
		}
		else {
			activeCoin.style.right = (activeCoinState * 10).toString() + "%";
			activeCoin.style.transform = "rotate(-" + activeCoinState.toString() + "rad)";
		}

		if (this.coinStates[launcherIndex]) {
			activeCoin.style.display = 'flex';
		}
		else {
			activeCoin.style.display = 'none';
		}
	}


	moveCoin(launcherIndex) {
		if (this.coinStates[launcherIndex] == 8) {
			if (this.getPlayerIndex(this.onTop, this.onLeft) == launcherIndex) {
				this.increaseScore();
			}
			else {
				this.decreaseLives();
			}
			this.coinStates[launcherIndex] = 0;
		}
		else {
			this.coinStates[launcherIndex] += 1;
			let that = this;
			setTimeout(function () {
				that.moveCoin(launcherIndex);
			}, 200);
		}
		this.moveCoinSprite(launcherIndex);
	}

	gameplayLoop() {
		if (this.play) {
			let activeLauncherIndex = Math.floor(Math.random() * (4));
			this.moveCoin(activeLauncherIndex);

			let that = this;
			setTimeout(function () { that.gameplayLoop(); }, 2000);
		}

	}

	startGame() {
		this.playerScore = 0;
		this.playerLives = 3;

		this.updateScoreCounter();
		this.updateLivesCounter();
		this.updatePlayerPosition(true, true);

		this.play = true;
		this.gameplayLoop();
	}
}


let player = new Player();
player.startGame();
