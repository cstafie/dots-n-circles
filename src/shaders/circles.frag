#ifdef GL_ES
precision mediump float;
#endif


#define r 100.0
#define PI 3.14159265359
#define root3 sqrt(3.0)

#define p1 vec2(100.0, 100.0)

uniform vec2 u_resolution; 
uniform float u_time;
uniform vec2 u_mouse;

float circle(vec2 a) {
   vec2 b = mod(a, vec2(2.0, 2.0 * root3));

  return step(1.0, distance(b, vec2(0.0))) * 
  step(1.0, distance(b, vec2(0.0, 2.0 * root3))) *  
   step(1.0, distance(b, vec2(1.0, root3))) *
   step(1.0, distance(b, vec2(2.0, 0.0))) *
   step(1.0, distance(b, vec2(2.0, 2.0 * root3)));
}

void main() {
	vec3 colour = vec3(1.0, 0.0, 0.0);

	float mc = circle((gl_FragCoord.xy - vec2(u_time * 100.0)) / r);

	colour =  mc * colour;

	gl_FragColor = vec4(colour, 1.0);
}
