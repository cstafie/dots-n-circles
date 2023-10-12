import { useEffect, useRef } from "react";
import p5 from "p5";

interface Props {
  sketch: (s: p5) => void;
}

export default function Sketch({ sketch }: Props) {
  const canvasRef = useRef<HTMLElement>(null);
  // const [sketchCreated, setSketchCreated] = useState(false);
  const sketchRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (canvasRef.current && !sketchRef.current) {
      sketchRef.current = new p5(sketch, canvasRef.current);
    }

    return () => {
      // this prevents multiple canvases from being created
      sketchRef.current?.removeElements();
    };
  }, [canvasRef, sketch]);

  return <section style={{ height: "100vh" }} ref={canvasRef}></section>;
}
