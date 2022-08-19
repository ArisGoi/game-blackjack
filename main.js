
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
 * @returns a deck of 104 cards 
 */
function getDeck(){
    let deck = new Array(); //creo un array
    
    for(let c = 0; c < 2; c++){ //ciclo x2 mazzi da 52 = deck da 104 carte
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
                    seed_icon: seeds[i].icon,
                    color: seeds[i].color
                };

                // pusho la carta
                deck.push(card);
            }
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

    // se il mazzo ha abbastanza carte distribuisce le carte altrimenti ne genera uno nuovo
    if(playDeck.length > 20){
        for(let i=0; i<2; i++){
            for(let x=0; x<players.length; x++){
                let card = playDeck.pop(); // pop() prende il primo elemento di un'array e lo rimuove
                players[x].hand.push(card);
                updatePoints(x); // 0 è l'ID del banco
            }
        }
    } else {
        alert('Mazzo esaurito! Ricarico...');
        window.location.reload();
    }
    renderPlayers();//render

    document.getElementById('deal-hands').classList.add('hide');
    document.getElementById('player-actions').classList.remove('hide');
}

// CLEAR HAND
function clearHand(player_id){
    players[player_id].hand = []; // svuota la mano del giocatore
    console.log('pulisco mano');
    renderField();//render
}

// UPDATE POINTS
function updatePoints(player_id){ // id:0 è il banco / id:x è un player
    let counter = 0;
    for(let i = 0; i < players[player_id].hand.length; i++){
        counter += players[player_id].hand[i].weight;
    }
    console.log('points: calcolo');

    // Regola Asso 1/11
    if(counter >= 22 && players[player_id].hand.find(card => card.weight == 11)){
        // mi salvo la carta
        let asso = players[player_id].hand.find(card => card.weight == 11);

        // Modifico il valore dell'asso
        asso.weight = 1;
        
        console.log('points: asso valore 1');
    }

    // ricalcolo il punteggio
    counter = 0;
    for(let i = 0; i < players[player_id].hand.length; i++){
        counter += players[player_id].hand[i].weight;
    }
    console.log('points: ricalcolo');

    players[player_id].points = counter;

    if(player_id !=0 && players[player_id].points >= 21){
        houseTurn();
    }
}

// TAKE A CARD
function getOneCard(player_id){
    console.log('prendo carta');
    let card = playDeck.pop();
    players[player_id].hand.push(card);
    updatePoints(player_id);
    renderPlayers();//render
}

// TURNO DEL BANCO / STAI
function houseTurn(){ 
    console.log('turno del banco');
    if(players[0].points >= 17){
        alert('il banco scopre le carte');
    } else {
        do{
            getOneCard(0);
        } while(players[0].points < 17);
    }

    setTimeout(function(){renderField()}, 10); //bug fixato con timeout

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
    document.getElementById('house-hand').innerHTML += `<span style="color:${players[0].hand[0].color}">${players[0].hand[0].value} ${players[0].hand[0].seed_icon}</span> / *`;
    document.getElementById('house-points').innerHTML = players[0].hand[0].weight;
}

function renderField(){
    //Banco
    document.getElementById('house-hand').innerHTML = '';
    for(let i = 0; i < players[0].hand.length; i++){
        document.getElementById('house-hand').innerHTML += `<span style="color:${players[0].hand[i].color}">${players[0].hand[i].value} ${players[0].hand[i].seed_icon}</span> / `;
    }
    document.getElementById('house-points').innerHTML = players[0].points; 

    // Player-1
    document.getElementById('player-hand').innerHTML = '';
    for(let i = 0; i < players[1].hand.length; i++){
        document.getElementById('player-hand').innerHTML += `<span style="color:${players[1].hand[i].color}">${players[1].hand[i].value} ${players[1].hand[i].seed_icon}</span> / `;
    }
    document.getElementById('player-points').innerHTML = players[1].points;

}