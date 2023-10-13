import p5 from "p5";
import { randomColor } from "../utils";

const UNIT = 64;

const OFFSET = Math.sqrt(3) * UNIT;

export default function sketch(s: p5) {
  s.setup = () => {
    const { windowWidth, windowHeight, DEGREES, HSB } = s;
    s.createCanvas(windowWidth, windowHeight);
    s.angleMode(DEGREES);
    s.colorMode(HSB, 360, 100, 100, 100);
  };

  s.windowResized = () => {
    const { windowWidth, windowHeight } = s;
    s.resizeCanvas(windowWidth, windowHeight);
  };

  const c1 = [...randomColor(s), 50];
  const c2 = [...randomColor(s), 50];

  // const drawLattice = (startX, startY) => {};

  s.draw = () => {
    const { windowWidth, windowHeight, mouseX, mouseY } = s;

    s.background(255);
    // s.stroke("white");
    s.strokeWeight(0);

    const width = Math.ceil(windowWidth / (UNIT * 2)) + 1;
    const height = Math.ceil(windowHeight / (UNIT * 2 - OFFSET)) + 1;

    for (let x = -width; x <= width; x++) {
      for (let y = -height; y <= height; y++) {
        s.fill(c1);
        s.circle(x * UNIT * 2 + (y % 2 ? 0 : UNIT), y * OFFSET, UNIT * 2);

        s.fill(c2);
        s.circle(
          x * UNIT * 2 + (y % 2 ? 0 : UNIT) + mouseX + UNIT,
          y * OFFSET + mouseY,
          UNIT * 2
        );

        // s.mouseClicked();

        // s.fill("blue");
        // s.circle(x * UNIT * 2 + (y % 2 ? 0 : UNIT), y * UNIT * 2, OFFSET);
      }
    }
  };
}
