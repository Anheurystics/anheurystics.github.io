var canvas;
var isFocused = false;
var context;

var keys = [];

window.onload = function() {
	canvas = document.getElementById("demo");
	canvas.addEventListener("click", function(e) {
		isFocused = true;
	}, false);

	context = canvas.getContext("2d");

	//Load images here, or call start
}

function start() {
	requestAnimationFrame(render);
}

function render() {
	requestAnimationFrame(render);
	context.clearRect(0, 0, canvas.width, canvas.height);

	//Draw stuff here

	context.font = "normal 14pt Open Sans"
	context.textAlign = "center";

	if(!isFocused) {
		context.fillStyle = "rgba(0, 0, 0, 0.7)";
		context.fillRect(0, 0, canvas.width, canvas.height);

		context.fillStyle = "#FFFFFF";
		context.fillText("Demo is unfocused, click to focus", canvas.width / 2, 20);
	} else {
		context.fillStyle = "#FFFFFF";
		context.fillText("Demo is focused, click outside to unfocus", canvas.width / 2, 20);
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