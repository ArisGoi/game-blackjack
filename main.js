



// DECK
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const seeds = [
    {
        name: "hearts",
        name_it: "cuori",
        icon: "♥"
    },
    {
        name: "diamonds",
        name_it: "quadri",
        icon: "♦"
    },
    {
        name: "clubs",
        name_it: "fiori",
        icon: "♣"
    },
    {
        name: "spades",
        name_it: "picche",
        icon: "♠"
    },
]

/**
 * GET DECK
 * @returns a deck of 52 cards 
 */
function getDeck(){
    let deck = new Array(); //creo un array
    
    for(let i = 0; i < seeds.length; i++){ //ciclo per i semi
        for(let x = 0; x < values.length; x++){ //ciclo per valore

            let c_weight; //var "peso" numerico della carta

            //stabilisco il "peso" delle carte
            if (values[x] == "J" || values[x] == "Q" || values[x] == "K"){
                c_weight = 10;
            } else if (values[x] == "A"){
                c_weight = 11;
            } else {
                c_weight = parseInt(values[x])
            }

            // creo la carta
            let card = {value: values[x], weight: c_weight, seed: seeds[i].name};

            // pusho la carta
            deck.push(card);
        }
    }

    return deck;
}

// MISCHIO IL DECK
function shuffle(deck){
    // for 1000 times
	// switch the values of two random cards
	for (let i = 0; i < 3000; i++)
	{
		let location1 = Math.floor((Math.random() * deck.length));
		let location2 = Math.floor((Math.random() * deck.length));
		let tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
}

// ###############
// ### PLAYERS ###
// ###############
var players = new Array();
function createPlayers(num){
    if(!isNaN(num) && num <= 3 && num > 0){
        for(let i = 1; i <= num; i++){
            var a_hand = new Array();
            var player = {id: i, name: `player-${i}`, points: 0, hand: a_hand};
            players.push(player);
        }
    } else {
        alert('Errore! {number_of_players} non è un numero, deve essere un numero tra 1, 2, 3')
    }
}



// START THE FUNCTIONS
let playDeck;
function start(){
    playDeck = getDeck();
    shuffle(playDeck);
    createPlayers(1);

    console.log(playDeck, players);
}