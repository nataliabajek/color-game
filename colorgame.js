var numSquares = 6;
var colors = [];
var pickedColor = pickColor();
var gameOver = false;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("h1 span");
var resetBtn = document.querySelector("#reset");
var modeBtns = document.querySelectorAll(".mode");

init();

function init() {
	setupModeButtons();
	setupSquares();
	reset();
};

resetBtn.addEventListener("click", function() {
	reset();
});

function setupModeButtons() {
	for (var i = 0; i < modeBtns.length; i++) {
		modeBtns[i].addEventListener("click", function(){
			modeBtns[0].classList.remove("selected");
			modeBtns[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
};

function setupSquares() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			if (!gameOver) {
				if (pickedColor !== this.style.backgroundColor) {
					this.style.backgroundColor = "#232323";
					document.querySelector("nav span").textContent = "Try Again";
				} else {
					gameOver = !gameOver;
					document.querySelector("header").style.backgroundColor = pickedColor;
					document.querySelector("nav span").textContent = "Correct!!";
					resetBtn.textContent = "Play Again?";
					changeColors(clickedColor);
				}
			}
		});
	}
};

function changeColors(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = pickedColor;
	}
};

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
};

function generateRandomColors(num) {
	var arr = [];
	for (var i = 0; i < num; i++){
		arr.push(randomColor());
	}
	return arr;
};

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
};

function reset() {
	document.querySelector("nav span").textContent = "";
	resetBtn.textContent = "New Colors";
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	//change colors of squares
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	};
	document.querySelector("header").style.backgroundColor = "steelblue";
	gameOver = false;
};