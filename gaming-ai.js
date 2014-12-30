/*
	LIVE DEMO AT https://dl.dropbox.com/u/12019700/gaming-ai/demos.html
*/

// global variables
var FPS = 30, goodX, goodY, offset = 2, badX = badY = 0, w = 75, h = 50, canvas, context, gameLoopID, soundFX;
var goodGuy, badGuy;

// main positional object
function init() {
	canvas = document.getElementById("gamingSurface");	
	context = canvas.getContext("2d");
	
	soundFX = document.getElementById("FX-busted");
	
	// set the starting position for the goodGuy
	goodX = canvas.width - (w+offset);
	goodY = canvas.height - (h+offset);
	
	// character images
	goodGuy = new Image();
	goodGuy.src = "robber.jpg";
	
	badGuy = new Image();
	badGuy.src = "cop.jpg";

	// start the game
	gameLoop();
	
	/*
		DEMO 2: continuous environment-based pursuit (Bresenham's algorithm)
		---------------------------------------------------------------------------------
	*/
}

function gameLoop() {
	gameLoopID = setInterval(draw,1000/FPS);
}

function draw() {
	context.clearRect(0,0,canvas.width,canvas.height);
	
	// check for changes
	positionCheck();
	
	// goodGuy
	context.drawImage(goodGuy,goodX,goodY);
	
	// badGuy
	context.drawImage(badGuy,badX,badY);
}

function positionCheck() {
	/* 
		CHASING ALGORITHM 
	
		DEMO 1: grid-based pursuit
	*/
	if(badX == goodX && badY == goodY) {
		// the good guy has been caught, so stop the game loop
		clearInterval(gameLoopID);
		
		winner = document.createElement("div");
		winner.className = "winner";
		
		var message = document.createTextNode("busted!");
		winner.appendChild(message);
		
		document.body.appendChild(winner);
		
		// sound the tone
		soundFX.play();
	} else {
		// vertical position
		if(badY > goodY) {
			badY--;
		} else if(badY < goodY) {
			badY++;
		}
		
		// horizontal position
		if(badX > goodX) {
			badX--;
		} else if(badX < goodX) {
			badX++;
		}
	}
}

function keyPressHandler(e) {
	switch(e.keyCode) {
		case 38:		// up arrow
			goodY -= 5;
			if(goodY <= 0) goodY = 0;	
			break;
		case 40:		// down arrow
			goodY += 5;
			if(goodY >= canvas.height-h) goodY = canvas.height-h;
			break;
		case 37:		// left arrow
			goodX -= 5;
			if(goodX <= 0) goodX = 0;
			break;
		case 39:		// right arrow
			goodX += 5;
			if(goodX >= canvas.width-w) goodX = canvas.width-w;
			break;
	}
}

function mouseTouchScreenHandler(e) {
	goodY = Math.floor((e.pageY-canvas.offsetTop)-(h/2));
	goodX = Math.floor((e.pageX-canvas.offsetLeft)-(w/2));
}

window.addEventListener("keydown",keyPressHandler,true);
window.addEventListener("mousedown",mouseTouchScreenHandler,true);
window.onload = init;