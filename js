let blackJGame = {
    'you': {'scoreSpan': '#yourscore' , 'div': '#player', 'score': 0},
    'dealer': {'scoreSpan': '#dealerscore' , 'div': '#dealer', 'score': 0},
    
    'cards': ['2C','3C','4C','5C','6C','7C','8C','9C','10C','KC','QC','JC','AC','2D','3D','4D','5D','6D','7D','8D','9D','10D','KD','QD','JD','AD','2H','3H','4H','5H','6H','7H','8H','9H','10H','KH','QH','JH','AH','2S','3S','4S','5S','6S','7S','8S','9S','10S','KS','QS','JS','AS'],
    
    'cardsmap': {'2C':2,'3C':3,'4C':4,'5C':5,'6C':6,'7C':7,'8C':8,'9C':9,'10C':10,'KC':10,'QC':10,'JC':10,'AC':[1, 11],'2D':2,'3D':3,'4D':4,'5D':5,'6D':6,'7D':7,'8D':8,'9D':9,'10D':10,'KD':10,'QD':10,'JD':10,'AD':[1, 11],'2H':2,'3H':3,'4H':4,'5H':5,'6H':6,'7H':7,'8H':8,'9H':9,'10H':10,'KH':10,'QH':10,'JH':10,'AH':[1, 11],'2S':2,'3S':3,'4S':4,'5S':5,'6S':6,'7S':7,'8S':8,'9S':9,'10S':10,'KS':10,'QS':10,'JS':10,'AS':[1, 11]},

    'wins':0,
    'losses':0,
    'draws':0
};
const You = blackJGame['you'];
const Dealer = blackJGame['dealer'];

function drawCard(activeplayer) {
    const randomNumber = Math.floor(Math.random() * (blackJGame['cards'].length));
    const currentCard = blackJGame['cards'].splice(randomNumber, 1);
    let card = document.createElement('img');
    card.src = `pictures${currentCard}.png`;
    document.querySelector(activeplayer['div']).appendChild(card);
    
    updateScore(currentCard, activeplayer);

    showScore(activeplayer);
    
}

function updateScore(currentcard, activeplayer){
    if(currentcard == 'AC' || currentcard == 'AD' || currentcard == 'AH' || currentcard == 'AS'){
        if((activeplayer['score'] + blackJGame['cardsmap'][currentcard][1]) <= 21){

            activeplayer['score'] += blackJGame['cardsmap'][currentcard][1];
        }
        else{
            activeplayer['score'] += blackJGame['cardsmap'][currentcard][0];
        }
    }
    else{ 
        activeplayer['score'] += blackJGame['cardsmap'][currentcard];
    }   
}

function showScore(activeplayer){
    if(activeplayer['score']>21){
        document.querySelector(activeplayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activeplayer['scoreSpan']).style.color = 'yellow';
    }
    else{
        document.querySelector(activeplayer['scoreSpan']).textContent = activeplayer['score'];
    }
}
function whoIsWinner(){
    let winner;

    if(You['score']<=21){
        if(Dealer['score']<You['score'] || Dealer['score']>21){
            blackJGame['wins']++;
            winner = You;
        }
        else if(Dealer['score'] == You['score']){
            blackJGame['draws']++;
        }
        else{
            blackJGame['losses']++;
            winner = Dealer;
        }
    }
    else if(You['score']>21 && Dealer['score']<=21){
        blackJGame['losses']++;
        winner = Dealer;
    }
    else if(You['score']>21 && Dealer['score']>21){
        blackJGame['draws']++;
    }
    return winner;
}

function showresults(winner){
    if(winner == You){
        document.querySelector('#command').textContent = 'You Won!';
        document.querySelector('#command').style.color = 'green';
    }
    else if(winner == Dealer){
        document.querySelector('#command').textContent = "You Lost!";
        document.querySelector('#command').style.color = 'red';
        loseSound.play();
    }
    else{
        document.querySelector('#command').textContent = 'You Drew!';
        document.querySelector('#command').style.color = 'yellow';
        drawSound.play();
    }

}

function scoreboard(){
    document.querySelector('#wins').textContent = blackJGame['wins'];
    document.querySelector('#losses').textContent = blackJGame['losses'];
    document.querySelector('#draws').textContent = blackJGame['draws'];
}

document.querySelector('#hit').addEventListener('click', BJhit);

function BJhit(){
    if(Dealer['score'] === 0){
        if(You['score']<=21){
            drawCard(You);
        }
    }
}

document.querySelector('#deal').addEventListener('click', BJdeal);

function BJdeal(){

    if(You['score']=== 0){
        alert('Hit Me ');
    }
    else if(Dealer['score']===0){
        alert('Stand, dealers turn');
    }
    else{

    let yourimg = document.querySelector('#player').querySelectorAll('img');
    let dealerimg = document.querySelector('#dealer').querySelectorAll('img');
    
    for(let i=0; i<yourimg.length; i++){
        yourimg[i].remove();
    }
    for(let i=0; i<dealerimg.length; i++){
        dealerimg[i].remove();
    }

    blackJGame['cards'] = ['2C','3C','4C','5C','6C','7C','8C','9C','10C','KC','QC','JC','AC','2D','3D','4D','5D','6D','7D','8D','9D','10D','KD','QD','JD','AD','2H','3H','4H','5H','6H','7H','8H','9H','10H','KH','QH','JH','AH','2S','3S','4S','5S','6S','7S','8S','9S','10S','KS','QS','JS','AS'];

    You['score'] = 0;
    document.querySelector(You['scoreSpan']).textContent = You['score'];
    document.querySelector(You['scoreSpan']).style.color = 'white';
    Dealer['score'] = 0;
    document.querySelector(Dealer['scoreSpan']).textContent = Dealer['score'];
    document.querySelector(Dealer['scoreSpan']).style.color = 'white';

    document.querySelector('#command').textContent = "Let's Play";
    document.querySelector('#command').style.color = 'black';
    }
}

document.querySelector('#stand').addEventListener('click', BJstand)

function BJstand(){
    if(You['score']===0){
        alert('Hit me');
    }
    else{
        while(Dealer['score']<16){
            drawCard(Dealer);
        }
        setTimeout(function(){
            showresults(findwinner());
            scoreboard();
        }, 800); 
    }
}
