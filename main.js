



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
    let deck = new Array();
    
    for(let i = 0; i < seeds.length; i++){
        for(let x = 0; x < values.length; x++){
            let card = {value: values[x], seed: seeds[i].name};
            deck.push(card);
        }
    }

    return deck;
}

// Shuffle deck
function shuffle(deck){
    // for 1000 times
	// switch the values of two random cards
	for (let i = 0; i < 1000; i++)
	{
		let location1 = Math.floor((Math.random() * deck.length));
		let location2 = Math.floor((Math.random() * deck.length));
		let tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
}


// RENDER DA RIVEDERE
function renderDeck(deck){
    document.getElementById("deck").innerHTML = "";

	for(let i = 0; i < deck.length; i++)
	{
		let card = document.createElement("div");
		let value = document.createElement("div");
		let suit = document.createElement("div");
		card.className = "card";
		value.className = "value";
		suit.className = "suit " + deck[i].seed;

		value.innerHTML = deck[i].value;
		card.appendChild(value);
		card.appendChild(suit);

		document.getElementById("deck").appendChild(card);
	}
}

// START THE FUNCTIONS
let playDeck;
function start(){
    playDeck = getDeck();
    shuffle(playDeck);
    renderDeck(playDeck);
}