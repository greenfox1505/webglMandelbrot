//todo seperate file
#define runs 512
//varying vec2 vUV;


varying vec2 c;

uniform vec3 color;
uniform vec2 botLeft;
uniform vec2 size;


vec2 iSqr(vec2 i){
	return vec2( (i.x * i.x) - (i.y *i.y),2.0*(i.x*i.y));
}
float iABS2(vec2 i){
	return (i.x * i.x) +(i.y* i.y);
}
int mend(){
	//vec2 c = (vUV * size) + botLeft;
	vec2 z = c;
	for(int i = 0; i < runs; i++){
		z = iSqr(z) + c;
		if(iABS2(z)>4.0){
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