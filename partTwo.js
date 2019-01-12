//requires inquirer
var inquirer = require("inquirer");
//player constructor
function Player(name, position, offense, defense, goodGame, badGame, printStats) {
    this.name = name;
    this.position = position;
    this.offense = offense; 
    this.defense = defense;
    this.goodGame = function goodGame() {
        let odds = Math.floor(Math.random() * 10)+1;
        if (odds < 5) {
            this.offense += 5
        } else if (odds > 5) {
            this.defense += 5
        }
    }
    this.badGame = function badGame() {
        let odds = Math.floor(Math.random() * 10)+1;
        if (odds < 5) {
            this.offense - 5
        } else if (odds > 5) {
            this.defense - 5
        }
    }
    this.printStats = function printStats() {
        console.log("Name: ", this.name, "Position: ", this.position, "Defense: ", this.defense);
    }
}

var count = 0;

var starters = [];

var subs = [];

var createPlayers = function() {
    if (count < 3) {
        console.log("Create a new player!");

        inquirer.prompt([
            {
                name: "name",
                message: "What's their name?"
            },
            {
                name: "position",
                message: "What is their position?"
            },
            {
                type: "list",
                message: "What's their offensive level?",
                choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                name: "offense",
            },
            {
                type: "list",
                message: "What's their defensive level?",
                choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                name: "defense",
            }
        ]).then(function(answers) {
            var newPlayer = new Player(
                answers.name,
                answers.position,
                parseInt(answers.offense),
                parseInt(answers.defense))

        if (count < 2) {
            starters.push(newPlayer);
        } else {
            subs.push(newPlayer);
        }

        count++;

        createPlayers();
        });
    } else {
        playGame();
    }
}
createPlayers();


// variables to hold random numbers for gameplay
var rando1;
var rando2;

// variables to hold the team's combined stats
var teamOffense;
var teamDefense;
var teamScore = 0;

// variable we will use to count how many rounds have been played
var countRounds = 0;

function newNumbers() {
    rando1 = parseInt(Math.floor(Math.random() * 21) + 1);
    rando2 = parseInt(Math.floor(Math.random() * 21) + 1);
    console.log("The other teams stats are: " + "\n Offense: " + rando1 + "\n Defense: " + rando2);
};

function teamStats(){
    teamOffense = (parseInt(starters[0].offense) + parseInt(starters[1].offense));
    teamDefense = (parseInt(starters[0].defense) + parseInt(starters[1].defense));
    console.log("Okay. Your team stats are: " + "\n Team Offense: " + teamOffense + "\n Team Defense: " + teamDefense);
}

function fight() {
    console.log("FIGHT!!")
    checkResults();
    if (rando1 < teamOffense) {
        teamScore++;
        console.log("Boom! You beat the other team!")
    }

    else if (rando2 > teamDefense) {
        checkResults();
        teamScore--;    
    console.log("Ouch! The other team beat you this round.")
    }
    
};

function askSwap() {
    inquirer.prompt([{
        type: "list",
        message: "Would you like to swap out a player for your substitute?",
        choices: "Yes, No",
        name: "swapQuestion",
    }]).then(function (answers) {
        if (answers.askSwap === "yes" || answers.askSwap === "Yes"){
            starters.push(subs[0]);
            subs.push(starters[0]);
            console.log(subs, starters)
        };
    })
}

function playAgain() {
    inquirer.prompt([{
        type: "list",
        message: "Would you like to play again?",
        choices: ["Yes", "No"],
        name: "playAgain",
    }]).then(function (answers) {
        if (answers.playAgain === "Yes" || answers.playAgain === "yes") {
            countRounds = 0;
            teamScore = 0;
            askSwap();
            playGame();
        }
        else if (answers.playAgain === "No"){
            console.log("Fine then, I don't wanna play with you anyway!")
            process.exit();
        }
    })}

function checkResults(){
    if(teamDefense > 0){
        console.log("You'll live to fight another day!")
    }
    else{
        console.log("You got beat!")
        countRounds = 5;
    }
}


function playGame () {
    // if statement to ensure that our game is only played 5 times
    if (countRounds < 5) {
        console.log("NEW ROUND");
        newNumbers();
        teamStats();
        fight();
        teamStats();
        console.log("Your score is: " + teamScore);
        

        // Add to the count, which is keeping track of how many rounds have been played
        countRounds++;

        // end of if function

        playGame();
    }
    else {
            playAgain();
    }

    // End of playGame
};