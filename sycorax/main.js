/*global THREE requestAnimationFrame*/

console.log("test")
var width = 5;
var height = 5;

var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);

var renderer = new THREE.WebGLRenderer();

window.onresize = function() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
}
window.onresize()

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
		value: new THREE.Vector3(1, 0, 0)
	}
}

var geometry = new THREE.PlaneGeometry(5, 5);
var material = new THREE.ShaderMaterial({
	uniforms: uniforms,
	vertexShader: document.getElementById('vertexShader').textContent,
	fragmentShader: document.getElementById('fragmentShader').textContent

});


var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 1;

var n = {
	center: new THREE.Vector2(-0.75, 0),
	zoom: 20
}


var render = function() {
	var z = Math.pow(1.05, n.zoom);
	uniforms.botLeft.value = {
		x: n.center.x - z / 2,
		y: n.center.y - z / 2
	}
	uniforms.size.value = new THREE.Vector2(z, z);

	renderer.render(scene, camera);
	requestAnimationFrame(render);
};

document.onmousewheel = function(event) {
	n.zoom += event.deltaY / 100;
	console.log(n.zoom)
}
document.onmousemove = function(event) {
	if (event.buttons == 1) {
		var z = Math.pow(1.05, n.zoom);
		var delta = {
			dx: event.movementX / window.innerWidth,
			dy: event.movementY / window.innerHeight
		}
		n.center.x -= delta.dx*z
		n.center.y += delta.dy*z

		console.log(delta)
	}
}

render();