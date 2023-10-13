import { Point } from "../types";

interface Settings {
  scaleOpacity: boolean;
}

export default function generateShader(
  points: Point[],
  { scaleOpacity }: Settings
): string {
  const shader = [shaderStart];

  // define points
  points.forEach(({ x, y }, i) =>
    shader.push(`#define p${i} vec2(${x}.,${y}.)`)
  );

  shader.push(shaderMain);

  // make circles
  points.forEach((_, i) =>
    shader.push(`circle((gl_FragCoord.xy - p${i})/radius)+`)
  );

  shader.push(shaderMouseCircle);

  shader.push(shaderPoints);

  // make points
  points.forEach((_, i) => shader.push(`point(p${i},gl_FragCoord.xy)+`));

  shader.push(shaderMousePoint);

  shader.push(shaderColors);

  if (scaleOpacity) {
    shader.push("circlesColor /= 10.0;");
  }

  shader.push(shaderEnd);

  return shader.join("\n");
}

const shaderStart = `
#ifdef GL_ES
precision mediump float;
#endif

#define radius 100.0
#define pointSize 5.0
#define root3 sqrt(3.0)`;

const shaderMain = `
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
`;

const shaderMouseCircle = "circle((gl_FragCoord.xy-u_mouse)/radius);";

const shaderPoints = "float points=";

const shaderMousePoint = "point(u_mouse,gl_FragCoord.xy);";

const shaderColors = `
vec3 circlesColor=circles*vec3(1.,0.,0.);
vec3 pointsColor=points*vec3(.0667,.7725,.7725);`;

const shaderEnd = `
gl_FragColor=vec4(circlesColor+pointsColor,1.);
}
`;
