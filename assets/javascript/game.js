//listen for key to start new game


var hangmanGame = {
	gameStarted: false,
	startGame: function() {
		console.log("Selected Player: " + this.selectPlayer());
		this.setBoard();
		this.gameStarted = true;
		
		},
	playerOptions:["Len-Dawson","Joe-Montana"],
	selectPlayer: function() {
		var player = this.playerOptions[Math.floor(Math.random()*this.playerOptions.length)];
		this.currentPlayer = player;
		guessContent = document.getElementById("game-main");

		var playerArray = [];
		for (i=0;i<player.length;i++){
			var spaceIndex = player.indexOf('-');
			if ( spaceIndex !== -1 && i===0) {
				playerArray[spaceIndex] = "_";
				playerArray[i]= "-";
				this.playerArray[i]="-";
				this.playerArray[spaceIndex]="_";
				// console.log("i = " + i + ": this.playerArray = " + this.playerArray);
			}
			else if (this.playerArray[i] !== "_") {
				playerArray[i]= "-";
				this.playerArray[i]="-";
			}
			
		}
		// console.log(this.playerArray);
		

		return player;
		
		},
	currentPlayer: null,
	guessesRemaining: 5,
	check: function(letter){
		//check if letter is part of player
		if(this.currentPlayer.includes(letter)){
			letterIndex = this.currentPlayer.indexOf(letter);
			this.playerArray[letterIndex]=letter;
			this.setBoard();
			}
		else {
			this.guessesRemaining -- ;
			console.log(this.guessesRemaining);
			document.getElementById('remaining').innerHTML = this.guessesRemaining;

			document.getElementById('guesses').innerHTML += "  " + letter;
			//put body part on board

			}
		},
	playerArray: [],
	setBoard: function() {
		html = '<ul id="game-main-list">';
			for (i=0;i<this.playerArray.length;i++){
				html += "<li>" + this.playerArray[i] + "  </li>";
			}	
		html += "</ul>";
		document.getElementById('game-main').innerHTML = html;
		console.log(html);
		}

}

document.onkeyup = function(event) {
	if(hangmanGame.gameStarted === false){
		hangmanGame.startGame();
	}
	else {
		//game must be started - send letter to game object
		hangmanGame.check(event.key);
	}
}


//game starts
	//choose player(answer) for new game
		//display blank spaces and player number on jersey
	//listen for typed letters
		//correct guess behavior
			//display correct letter on board
			//win game behavior if final letter
				//increment wins
				//display image of player
				//reset for next game
		//incorrect guess behavior
			//add body part to board
			//count down guesses remaining


//other options
	//prevent guessing the same letter
	//play music on game win
	//display short player bio


