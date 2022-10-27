var cards = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png", "ciri.png", "triss.png", "yen.png", "iorweth.png"];

for (i=cards.length-1; i>0; i--) {
	var j = Math.floor(Math.random() * (i+1));
	var temp = cards[i];
	cards[i] = cards[j];
	cards[j] = temp;
}
var d = document;

for(i=0; i<=11; i++) {
	d.getElementById("board").innerHTML+='<div class="card" id="c'+i+'"></div>'
	d.getElementById("c"+i).setAttribute("onclick", "revealCard("+i+")");
}
d.getElementById("board").innerHTML+='<div class="score">Turn counter: 0</div>';

var oneVisible = false;
var turnCounter = 0;
var visible_nr;
var lock = false;
var pairsLeft = 6;

function revealCard(nr){
	var opacityValue = $('#c'+nr).css('opacity');
	
	if (opacityValue != 0 && lock == false){
		lock = true;
		d.getElementById("c"+nr).setAttribute("onclick", ";");
		var obraz = "url(img/" + cards[nr] + ")";
		
		$('#c'+nr).css('background-image', obraz);
		$('#c'+nr).addClass('cardA');
		$('#c'+nr).removeClass('card');
		
		if(oneVisible == false){
			oneVisible = true;
			visible_nr = nr;
			d.getElementById("c"+visible_nr).setAttribute("onclick", ";");
			lock = false;
		}
		else{
			if(cards[visible_nr] == cards[nr]){
				setTimeout(function() { hide2Cards(nr, visible_nr) }, 750);
			}
			else{
				setTimeout(function() { restore2Cards(nr, visible_nr) }, 1000);
			}
			turnCounter++;
			$('.score').html('Turn counter: '+turnCounter);
			oneVisible = false;
		}
	}
}

function hide2Cards(nr1, nr2){
	$('#c'+nr1).css('opacity', '0');
	$('#c'+nr2).css('opacity', '0');
	
	pairsLeft--;
	
	if(pairsLeft == 0){
		$('#board').html('<a href=index.html><h1>You win!<br>Done in '+turnCounter+' turns<br>Click to restart</h1><a>');
	}
	
	lock = false;
}

function restore2Cards(nr1, nr2){
	$('#c'+nr1).css('background-image', 'url(img/karta.png)');
	$('#c'+nr1).addClass('card');
	$('#c'+nr1).removeClass('cardA');	
	d.getElementById("c"+nr1).setAttribute("onclick", "revealCard("+nr1+")");

	$('#c'+nr2).css('background-image', 'url(img/karta.png)');
	$('#c'+nr2).addClass('card');
	$('#c'+nr2).removeClass('cardA');
	d.getElementById("c"+nr2).setAttribute("onclick", "revealCard("+nr2+")");
	
	lock = false;
}