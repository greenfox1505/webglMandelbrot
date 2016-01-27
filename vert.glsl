//varying vec2 vUV;

varying vec2 c;
 
uniform vec2 botLeft;
uniform vec2 size;
uniform float asp;
 
void main() {
    c = botLeft + (uv * size);

//    vUV = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
 
}