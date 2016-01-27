/*global THREE requestAnimationFrame Stats*/

var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms, 2: mb

// align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild(stats.domElement);

var asp = 1;

console.log("test")
var width = 5;
var height = 5;

var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);

var renderer = new THREE.WebGLRenderer();


var uniforms = {
	botLeft: {
		type: "v2",
		value: new THREE.Vector2(0, 0)
	},
	size: {
		type: "v2",
		value: new THREE.Vector2(1, 1)
	},
	color: {
		type: "v3",
		value: new THREE.Vector3(0, 1, 0)
	}
}

var geometry = new THREE.PlaneGeometry(5, 5);
var material = new THREE.ShaderMaterial({
	uniforms: uniforms,
	vertexShader: shader.vert,
	fragmentShader: shader.frag,
	defines:{runs:512}

});


var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 1;

var setURL = function() {
	var i = window.location.origin + window.location.pathname + "?x=" + n.center.x +
		"&y=" + n.center.y +
		"&z=" + n.zoom +
		"&r=" + uniforms.color.value.x + "&g=" + uniforms.color.value.y + "&b=" + uniforms.color.value.z;
	//console.log(i)
	window.history.replaceState({}, "", i);

}
var move = function(input) {
	n.center.x = input.x
	n.center.y = input.y
	n.zoom = input.z;
}

var n = {
	center: new THREE.Vector2(-0.75, 0),
	zoom: 20
}


var render = function() {
	stats.end();
	stats.begin();


	var z = Math.pow(1.05, n.zoom);
	uniforms.botLeft.value = {
		x: n.center.x - (asp*z) / 2,
		y: n.center.y - z / 2
	}
	uniforms.size.value = new THREE.Vector2(asp*z, z);

	renderer.render(scene, camera);
	requestAnimationFrame(render);


};

renderer.domElement.onmousewheel = function(event) {
	n.zoom += event.deltaY / 100;
	if (n.zoom > 30) {
		n.zoom = 30
	}
	setURL();
}
renderer.domElement.onmousemove = function(event) {
	if (event.buttons == 1) {
		var z = Math.pow(1.05, n.zoom);
		var delta = {
			dx: event.movementX / window.innerWidth,
			dy: event.movementY / window.innerHeight
		}
		n.center.x -= delta.dx * z
		n.center.y += delta.dy * z
		if (n.center.x > 2) n.center.x = 2;
		if (n.center.y > 2) n.center.y = 2;
		if (n.center.x < -2) n.center.x = -2;
		if (n.center.y < -2) n.center.y = -2;
	}
	setURL();
}

render();




function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
		function(m, key, value) {
			vars[key] = value;
		});
	return vars;
}
var param = getUrlVars();
//debugger;

if (param.x) {
	n.center.x = parseFloat(param.x);
}
if (param.y) {
	n.center.y = parseFloat(param.y);
}
if (param.z) {
	n.zoom = parseFloat(param.z);
}
if (param.r) {
	uniforms.color.value.x = parseFloat(param.r);
}
if (param.g) {
	uniforms.color.value.y = parseFloat(param.g);
}
if (param.b) {
	uniforms.color.value.z = parseFloat(param.b);
}



var myCont = {};
myCont.red = uniforms.color.value.x;
myCont.green = uniforms.color.value.y;
myCont.blue = uniforms.color.value.z;
myCont.loadColor = function() {
	console.log(this.color);
	uniforms.color.value.x = myCont.red
	uniforms.color.value.y = myCont.green
	uniforms.color.value.z = myCont.blue
	console.log(uniforms.color.value);
	setURL()
};
var gui = new dat.GUI();
gui.add(myCont, "red", 0, 1).onChange(myCont.loadColor);
gui.add(myCont, "green", 0, 1).onChange(myCont.loadColor);
gui.add(myCont, "blue", 0, 1).onChange(myCont.loadColor);

//gui.add(myCont, 'loadColor');




window.onresize = function() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.domElement.setAttribute("id", "renderer")
	document.body.appendChild(renderer.domElement);
	
	
	asp = window.innerWidth/ window.innerHeight;


}
window.onresize();
