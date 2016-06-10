var canvas;
var isFocused = false;
var context;

var starfield1, starfield2;
var loadCount;

var cameraX = 0;
var cameraY = 0;

var scrollRate = 0.75;

var keys = [];

window.onload = function() {
	canvas = document.getElementById("parallax_demo");
	canvas.addEventListener("click", function(e) {
		isFocused = true;
	}, false);

	context = canvas.getContext("2d");

	loadImages();
}

function loadImages() {
	loadCount = 0;
	starfield1 = new Image();
	starfield1.src = "images/starfield1.png";
	starfield1.onload = onImageLoad;
	starfield2 = new Image()
	starfield2.src = "images/starfield2.png";
	starfield2.onload = onImageLoad;
}

function onImageLoad() {
	loadCount += 1;
	if(loadCount == 2) {
		start();
	}
}

function start() {
	requestAnimationFrame(render);
}

function render() {
	requestAnimationFrame(render);
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(starfield1, -cameraX * scrollRate, -cameraY * scrollRate);
	context.drawImage(starfield2, -cameraX, -cameraY);

	context.font = "normal 14pt Open Sans"
	context.textAlign = "center";

	if(!isFocused) {
		context.fillStyle = "rgba(0, 0, 0, 0.7)";
		context.fillRect(0, 0, canvas.width, canvas.height);

		context.fillStyle = "#FFFFFF";
		context.fillText("Demo is unfocused, click to focus", 250, 20);
	} else {
		context.fillStyle = "#FFFFFF";
		context.fillText("Demo is focused, click outside to unfocus", 250, 20);
		context.fillText("WASD keys to move, Q to toggle parallax", 250, 45);
		context.fillText("Parallax is " + (scrollRate == 1? "OFF":"ON"), 250, 70);

		if(keys[87]) cameraY -= 4;
		if(keys[83]) cameraY += 4;
		if(keys[65]) cameraX -= 4;
		if(keys[68]) cameraX += 4;

		cameraX = clamp(cameraX, 0, 500);
		cameraY = clamp(cameraY, 0, 500);
	}
}

function clamp(val, min, max) {
	if(val < min) return min;
	if(val > max) return max;
	return val;
}

window.addEventListener("keydown", function(e) {
	keys[e.keyCode] = true;
	if(isFocused) {
		e.preventDefault();
	}
}, false);

window.addEventListener("keyup", function(e) {
	keys[e.keyCode] = false;
	if(e.keyCode == 81) {
		scrollRate = (scrollRate == 1? 0.75 : 1);
		cameraX = 0;
		cameraY = 0;
	}
	if(isFocused) {
		e.preventDefault();
	}
}, false);

window.addEventListener("click", function(e) {
	isFocused = false;
}, true);