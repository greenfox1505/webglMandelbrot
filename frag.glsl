varying vec2 c;

uniform vec3 color;
uniform vec2 botLeft;
uniform vec2 size;


int mend(){
	//vec2 c = (vUV * size) + botLeft;
	vec2 z = c;
	float X2;
	float Y2;
	for(int i = 0; i < runs; i++){
		
		X2 = z.x * z.x;
		Y2 = z.y * z.y;
		z.y = 2.0*z.x*z.y+c.y;
		z.x = X2-Y2+c.x;
		
		if((X2+Y2)>4.0){
			return i;
		}
	}

	return 0;
}
int modulo(int a, int b){
	for ( int i = 0; i < runs; ++i )
	{
		a=a-b;
		if(a<b){
			return a;
		}
	}
	return 0;
}

void main() {
	float n = float(mend())/(float(runs)/2.0);
	if(n>1.0){
		gl_FragColor = vec4((n-1.)+color.x,(n-1.)+color.y,(n-1.)+color.z,1.);
	}
	else{
		gl_FragColor = vec4(color.x*n,color.y*n,color.z*n,1.0);
	}
}