



// DECK
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const seeds = [
    {
        name: "hearts",
        name_it: "cuori",
        icon: "♥",
        color: "red"
    },
    {
        name: "diamonds",
        name_it: "quadri",
        icon: "♦",
        color: "red"
    },
    {
        name: "clubs",
        name_it: "fiori",
        icon: "♣",
        color: "black"
    },
    {
        name: "spades",
        name_it: "picche",
        icon: "♠",
        color: "black"
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
            let card = {
                value: values[x],
                weight: c_weight,
                seed: seeds[i].name,
                seed_icon: seeds[i].icon
            };

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
var players = [
    {
        id: 0,
        name: 'Banco',
        points: 0,
        hand: [],
    }
];
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

// ###############
// ### CORE FUNCTIONS
// ###############

// DEAL HANDS
function dealHands(){
    for(let p_id = 0; p_id < players.length; p_id++){ // per ogni giocatore
        clearHand(p_id) // svuota la mano del giocatore
    }
    // Distribuisce le carte
    for(let i=0; i<2; i++){
        for(let x=0; x<players.length; x++){
            let card = playDeck.pop(); // pop() prende il primo elemento di un'array e lo rimuove
            players[x].hand.push(card);
            updatePoints(x); // 0 is house ID
        }
    }
    renderPlayers();//render

    document.getElementById('deal-hands').classList.add('hide');
    document.getElementById('player-actions').classList.remove('hide');
}

// CLEAR HAND
function clearHand(player_id){
    players[player_id].hand = []; // svuota la mano del giocatore
    renderField();//render
}

// UPDATE POINTS
function updatePoints(player_id){ // id:0 is house / id:x is player
    let counter = 0;
    for(let i = 0; i < players[player_id].hand.length; i++){
        counter += players[player_id].hand[i].weight;
    }
    players[player_id].points = counter;
}

// TAKE A CARD
function getOneCard(player_id){
    let card = playDeck.pop();
    players[player_id].hand.push(card);
    updatePoints(player_id);
    renderPlayers();//render
}

// HOUSE TURN / STAI
function houseTurn(){ 
    if(players[0].points >= 17){
        alert('il banco scopre le carte');
    } else {
        do{
            getOneCard(0);
            updatePoints(0);
            renderField();//render
        } while(players[0].points < 17);

        alert('il banco pesca delle carte');
    }

    renderField();//render

    document.getElementById('deal-hands').classList.remove('hide');
    document.getElementById('player-actions').classList.add('hide');
}

// ----------------
// START THE GAME
let playDeck;
function startBlackjack(){
    playDeck = getDeck();
    shuffle(playDeck);
    createPlayers(1);

    document.getElementById('pre-field').classList.add('hide');
    document.getElementById('field').classList.remove('hide');
    document.getElementById('player-actions').classList.add('hide');

    console.log(playDeck, players);
}

// -------
// RENDERS
// -------
function renderPlayers(){
    renderField();
    // house
    document.getElementById('house-hand').innerHTML = '';
    document.getElementById('house-hand').innerHTML += `${players[0].hand[0].value} ${players[0].hand[0].seed_icon} / *`;
    document.getElementById('house-points').innerHTML = players[0].hand[0].value;
}

function renderField(){
    // banco
    // Per il banco bisogna mostrare solo la prima carta e il valore della prima
    // solo alla fine bisogna mostrare tutti i dati...
    // spostare e creare un render personalizzato
    document.getElementById('house-hand').innerHTML = '';
    for(let i = 0; i < players[0].hand.length; i++){
        document.getElementById('house-hand').innerHTML += `${players[0].hand[i].value} ${players[0].hand[i].seed_icon} / `;
    }
    document.getElementById('house-points').innerHTML = players[0].points; 

    // Player-1
    document.getElementById('player-hand').innerHTML = '';
    for(let i = 0; i < players[1].hand.length; i++){
        document.getElementById('player-hand').innerHTML += `${players[1].hand[i].value} ${players[1].hand[i].seed_icon} / `;
    }
    document.getElementById('player-points').innerHTML = players[1].points;

}