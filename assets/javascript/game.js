

//game resides in this object
var hangmanGame = {
	//initially set that the game has not been started
	gameStarted: false, 
	 //start game, called on initial key up and between games
	startGame: 	function() { 
					this.selectPlayer();
					this.setBoard(); 
					this.gameStarted = true;  //used when deciding what to do when a key is pressed
					this.guessesRemaining = 7; //variable for deciding lose game condition
					$("#remaining").text(this.guessesRemaining);
					$("#guesses").text(""); 
					$(".hint").html("");

				},
	playerOptions:["LEN-DAWSON","JOE-MONTANA","JAMAAL-CHARLES","TONY-GONZALEZ","PRIEST-HOLMES"], //array of players, game would be stuck after all 5 are used
	//players object, I created after coding all the logic around playerOptions array.  So this is kinda overkill.  Using it to store hint info and game-win image
	players: { 
		"LEN-DAWSON" : {name:"Len Dawson",number:"16",position:"QUARTERBACK", imagePath: "assets/images/len.jpg"},
		"JOE-MONTANA": {name:"Joe Montana",number:"19",position:"QUARTERBACK", imagePath: "assets/images/joe.jpg"},
		"JAMAAL-CHARLES": {name:"Jamaal Charles",number:"25",position:"RUNNING BACK", imagePath: "assets/images/jamaal.jpg"},
		"TONY-GONZALEZ": {name:"Tony Gonzales",number:"88",position:"TIGHT END", imagePath: "assets/images/tony.jpg"},
		"PRIEST-HOLMES": {name:"Priest Holmes",number:"31",position:"RUNNING BACK", imagePath: "assets/images/priest.jpg"}

	},
	selectPlayer: 	function() {
						//take player out of array that was used last game (null on initial game)
						if(this.currentPlayerIndex !== null){
						this.playerOptions.splice(this.currentPlayerIndex,1);
						// console.log(this.playerOptions);
						}
						//randomize player selection
						var randomIndex = Math.floor(Math.random()*this.playerOptions.length);
						var player = this.playerOptions[randomIndex];
						//set object level player index for next time through this function - see line 27
						this.currentPlayerIndex = randomIndex;
						//set object level player (string)
						this.currentPlayer = player;

						//!!!!!!REMOVE   guessContent = document.getElementById("game-main");

						//end UL at end of first name, set ID for next UL (see CSS)
						var space = '</li></ul><ul id="last-name"><li>';
						//loop through all letters in string
						for (i=0;i<player.length;i++){
							//find the "-"" (all players in playerOptions have a dash between names)
							var spaceIndex = player.indexOf('-');
							//first time through the loop will always go through the below IF statement
							if ( spaceIndex !== -1 && i===0) {
								//change first letter to "-"
								this.playerArray[i]="-";
								//replace the space that's always there on first time through w/break string from line 43
								this.playerArray[spaceIndex]= space;
							}
							//run through this for all letters expect the 'space', which should stay as break string 
							else if (this.playerArray[i] !== space) {
								// playerArray[i]= "-";
								this.playerArray[i]="-";
							}
						
						}

					},
	currentPlayer: null,
	currentPlayerIndex: null,
	guessesRemaining: 7,
	//check what to do on key up, passes in the key
	check: 	function(letter){

				letter = letter.toUpperCase();
				//check if letter is member of letter array defined within the game object, i.e. is it a letter
				if(this.allLetters.includes(letter)){
					
					var i = 0;
					//loop for a correct guess
					if(this.currentPlayer.indexOf(letter,i)!==-1){
						//loop through the currentPlayer string until it doesnt find the letter.  currentPlayer isnt actually changed, the playerArray is, so the index (i) tells it where to start checking again
						while(this.currentPlayer.indexOf(letter,i)!==-1){
							letterIndex = this.currentPlayer.indexOf(letter,i);
							this.playerArray[letterIndex]=letter;
							i = letterIndex + 1;
						}
						//add html to the board w/revealed letters
						this.setBoard();
						//after replacing the latest guess w/letters, check if there are any "-" remaining in the array.  if not, win condition is met
						if(this.playerArray.indexOf("-")==-1){
							//pop up a modal, image for that modal is dymanic for the current player  
							var modalImage = $("<div>");
							modalImage.html('<img class="player-image"src="' + this.players[this.currentPlayer].imagePath + '" />');
							$("#modal-content").html(modalImage);
							$('#modal').modal();
							var winText = "<p>*** YOU WIN!! ***  PRESS ANY KEY TO START OVER.</p>";
								 $("#game-main").prepend(winText);
								 this.totalWins++;
								 //update w counter on page
								 $("#totalWins").text("W: " + this.totalWins);
								 //reset 
								 this.gameStarted = false;
								 this.playerArray = [];
					
						}
					}
					//loop for incorrect guess
					else {
						this.guessesRemaining -- ;
						//show guesses remaining on screen (would use jquery for this now that I know how)
						document.getElementById('remaining').innerHTML = this.guessesRemaining;
						//show incorrect letters
						document.getElementById('guesses').innerHTML += "  " + letter;
						var hintBox = $("#game-hint");
						//hint 1 @ 5 remaining
						if (this.guessesRemaining == 5){
							var hint1 = $("<h3>");
							//get info using the players object, keyed by player name string
							hint1.text("Jersey Number : " + this.players[this.currentPlayer].number);
							hint1.addClass("hint");
							hintBox.append(hint1);
						}
						//hint 2 @ 3 remaining
						if (this.guessesRemaining == 3){
							var hint2 = $("<h3>");
							hint2.text("Position : " + this.players[this.currentPlayer].position);
							hint2.addClass("hint");
							hintBox.append(hint2);
						}
						//check for loss
						if(this.guessesRemaining == 0){
							var loseText = "<p>GAME OVER. ANSWER IS: ** " + this.currentPlayer + " ** PRESS ANY KEY TO START OVER.</p>";
							$("#game-main").prepend(loseText);
							this.totalLosses++;
							//update loss counter on page
							$("#totalLosses").text("L: " + this.totalLosses);
							//reset
							this.gameStarted = false;
							this.playerArray = [];
					
						}


					}
				}
			},
	playerArray: [],  
	totalWins: 0,  //initial value
	totalLosses: 0,  //initial value
	//runs at beginning of game and after all correct guesses.  Makes player array into string.  Could do this better w/JQuery (now I know)
	setBoard: function() {
					//set id for list styling on first name. last name css id string is actually built into the array
					html = '<ul id="first-name">';
					for (i=0;i<this.playerArray.length;i++){
						html += "<li>" + this.playerArray[i] + "  </li>";
					}	
					html += "</ul>";
					document.getElementById('game-main').innerHTML = html;
				},
	allLetters: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V"
					,"W","X","Y","Z"]

}  //end of object 

//this checks whether game is started or not when a key is pressed, everthing else handled within the hangmanGame object
$(document).ready(function(){

	document.onkeyup = function(event) {
		if(hangmanGame.gameStarted === false){
			hangmanGame.startGame();
		}
		else {
			//game must be started - send letter to game object
			hangmanGame.check(event.key);
		}
	}

})

//original pseudo code below


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


