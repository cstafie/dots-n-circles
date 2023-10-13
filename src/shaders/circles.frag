#ifdef GL_ES
precision mediump float;
#endif

#define radius 100.
#define pointSize 5.
#define root3 sqrt(3.)

#define p1 vec2(100.,100.)
#define p2 vec2(200.,100.+root3)

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float circle(vec2 a){
   vec2 b=mod(a,vec2(2.,2.*root3));
   
   return step(1.,distance(b,vec2(0.)))*
      step(1.,distance(b,vec2(0.,2.*root3)))*
      step(1.,distance(b,vec2(1.,root3)))*
      step(1.,distance(b,vec2(2.,0.)))*
      step(1.,distance(b,vec2(2.,2.*root3)));
}

float point(vec2 center,vec2 p){
   return step(distance(center,p),pointSize);
}

void main(){
   float circles=
   circle((gl_FragCoord.xy-p1)/radius)+
   circle((gl_FragCoord.xy-p2)/radius)+
   circle((gl_FragCoord.xy-u_mouse)/radius);
   
   float points=
   point(p1,gl_FragCoord.xy)+
   point(p2,gl_FragCoord.xy)+
   point(u_mouse,gl_FragCoord.xy);
   
   vec3 circlesColor=circles*vec3(1.,0.,0.);
   vec3 pointsColor=points*vec3(.0667,.7725,.7725);

   // setting
   circlesColor /= 10.0;
   
   gl_FragColor=vec4(circlesColor+pointsColor,1.);
}
