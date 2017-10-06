//listen for key to start new game


var hangmanGame = {
	gameStarted: false,
	startGame: function() {

		


		// console.log("Selected Player: " + this.selectPlayer());
		this.selectPlayer();
		this.setBoard();
		this.gameStarted = true;
		this.guessesRemaining = 7;
		$("#remaining").text(this.guessesRemaining);
		$("#guesses").text("");


		
		},
	playerOptions:["LEN-DAWSON","JOE-MONTANA","JAMAAL-CHARLES","TONY-GONZALEZ","PRIEST-HOLMES",],
	players: {
		"LEN-DAWSON" : {name:"Len Dawson",number:"16",position:"QUARTERBACK", imagePath: "assets/images/len.jpg"},
		"JOE-MONTANA": {name:"Joe Montana",number:"16",position:"QUARTERBACK", imagePath: "assets/images/joe.jpg"},
		"JAMAAL-CHARLES": {name:"Jamaal Charles",number:"25",position:"RUNNING BACK", imagePath: "assets/images/jamaal.jpg"},
		"TONY-GONZALEZ": {name:"Tony Gonzales",number:"88",position:"TIGHT END", imagePath: "assets/images/tony.jpg"},
		"PRIEST-HOLMES": {name:"Priest Holmes",number:"31",position:"RUNNING BACK", imagePath: "assets/images/priest.jpg"}

	},
	selectPlayer: function() {
		if(this.currentPlayerIndex !== null){
			this.playerOptions.splice(this.currentPlayerIndex,1);
			console.log(this.playerOptions);
		}
		var randomIndex = Math.floor(Math.random()*this.playerOptions.length);
		var player = this.playerOptions[randomIndex];
		this.currentPlayerIndex = randomIndex;
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
	guessesRemaining: 7,
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
					var modalImage = $("<div>");
					modalImage.html('<img class="player-image"src="' + this.players[this.currentPlayer].imagePath + '" />');
					

					$("#modal-content").html(modalImage);
					// console.log($('#modal'));
					$('#modal').modal();
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

				var hintBox = $("#game-hint");

				if (this.guessesRemaining == 5){

					var hint1 = $("<h3>");
					hint1.text("Jersey Number : " + this.players[this.currentPlayer].number);
					hintBox.append(hint1);



				}

				if (this.guessesRemaining == 3){

					var hint2 = $("<h3>");
					hint2.text("Position : " + this.players[this.currentPlayer].position);
					hintBox.append(hint2);



				}



				//check for loss
					if(this.guessesRemaining == 0){
						 var loseText = "<p>GAME OVER. ANSWER IS: ** " + this.currentPlayer + " ** PRESS ANY KEY TO START OVER.</p>";
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


