//listen for key to start new game


var hangmanGame = {
	gameStarted: false,
	startGame: function() {
		// console.log("Selected Player: " + this.selectPlayer());
		this.selectPlayer();
		this.setBoard();
		this.gameStarted = true;
		$("#remaining").text("6");
		$("#guesses").text("");
		
		},
	playerOptions:["LEN-DAWSON","JOE-MONTANA","JAMAAL-CHARLES","TONY-GONZALES","PRIEST-HOLMES"],
	selectPlayer: function() {
		if(this.currentPlayerIndex !== null){
			this.playerOptions.splice(this.currentPlayerIndex,1);
			console.log(this.playerOptions);
		}
		var randomIndex = Math.floor(Math.random()*this.playerOptions.length);
		var player = this.playerOptions[randomIndex];
		this.currentPlayer = player;
		guessContent = document.getElementById("game-main");

		var space = '</li></ul><ul id="last-name"><li>';
		// var playerArray = [];
		for (i=0;i<player.length;i++){
			var spaceIndex = player.indexOf('-');
			if ( spaceIndex !== -1 && i===0) {
				// playerArray[spaceIndex] = space;
				// playerArray[i]= "-";
				this.playerArray[i]="-";
				this.playerArray[spaceIndex]= space;
				// console.log("i = " + i + ": this.playerArray = " + this.playerArray);
			}
			else if (this.playerArray[i] !== space) {
				// playerArray[i]= "-";
				this.playerArray[i]="-";
			}
			
		}
		console.log(this.playerArray);
		

		return player;
		
		},
	currentPlayer: null,
	currentPlayerIndex: null,
	guessesRemaining: 5,
	check: function(letter){

		letter = letter.toUpperCase();
		if(this.allLetters.includes(letter)){
			//check if letter is part of player
			var i = 0;
			if(this.currentPlayer.indexOf(letter,i)!==-1){
				while(this.currentPlayer.indexOf(letter,i)!==-1){
					letterIndex = this.currentPlayer.indexOf(letter,i);
					this.playerArray[letterIndex]=letter;
					i = letterIndex + 1;
				}
				this.setBoard();
				if(this.playerArray.indexOf("-")==-1){
					var winText = "<p>*** YOU WIN!! ***  PRESS ANY KEY TO START OVER.</p>";
						 $("#game-main").prepend(winText);
						 this.totalWins++;
						 $("#totalWins").text("W: " + this.totalWins);
						 this.gameStarted = false;
						 this.playerArray = [];
			
				}
			}

			else {
				this.guessesRemaining -- ;
				//console.log(this.guessesRemaining);
				document.getElementById('remaining').innerHTML = this.guessesRemaining;

				document.getElementById('guesses').innerHTML += "  " + letter;
				//check for loss
					if(this.guessesRemaining == 0){
						 var loseText = "<p>GAME OVER. ANSWER IS: **" + this.currentPlayer + "** PRESS ANY KEY TO START OVER.</p>";
						 $("#game-main").prepend(loseText);
						 this.totalLosses++
						 $("#totalLosses").text("L: " + this.totalLosses);
						 this.gameStarted = false;
						 this.playerArray = [];
			
					}


				}
		}

		//check for win



		},
	playerArray: [],
	totalWins: 0,
	totalLosses: 0,
	setBoard: function() {
		html = '<ul id="first-name">';
			for (i=0;i<this.playerArray.length;i++){
				html += "<li>" + this.playerArray[i] + "  </li>";
			}	
		html += "</ul>";
		document.getElementById('game-main').innerHTML = html;
		//console.log(html);
		},
	allLetters: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V"
					,"W","X","Y","Z"]

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


