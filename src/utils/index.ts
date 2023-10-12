import p5 from "p5";

export function randomXlet(s: p5, min: number, max: number, x: number) {
  const r = [];
  for (let i = 0; i < x; i++) {
    r.push(s.random(min, max));
  }
  return r;
}

export function randomColor(s: p5) {
  const xlet = randomXlet(s, 0, 256, 3);
  return xlet;
}

export function randomPosition(s: p5) {
  return [s.random(0, s.windowWidth), s.random(0, s.windowHeight)];
}

export function createColorPallet(s: p5, size: number) {
  const colors = [];
  for (let i = 0; i < size; i++) {
    colors.push(randomColor(s));
  }
  return colors;
}
