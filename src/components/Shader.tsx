import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "glsl-canvas-js/dist/cjs/glsl";
import { ContextMode } from "glsl-canvas-js/dist/cjs/context/context";
import generateShader from "../shaders/circles";
import { Point } from "../types";

export default function Shader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [sketchCreated, setSketchCreated] = useState(false);
  const shaderRef = useRef<Canvas | null>(null);

  const [scaleOpacity, setScaleOpacity] = useState(false);

  const [points, setPoints] = useState<Point[]>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setPoints((ps) => [
      ...ps,
      { x: e.clientX, y: (canvasRef.current?.height ?? 0) - e.clientY },
    ]);
  }, []);

  useEffect(() => {
    const options = {
      // vertexString: `...`,
      fragmentString: generateShader(points, {
        scaleOpacity,
      }),
      alpha: false,
      antialias: true,
      mode: ContextMode.Flat,
      extensions: ["EXT_shader_texture_lod"],
    };

    if (canvasRef.current)
      shaderRef.current = new Canvas(canvasRef.current, options);
  }, [canvasRef, points, scaleOpacity]);

  return (
    <>
      <button
        style={{ position: "fixed" }}
        onClick={() => setScaleOpacity((so) => !so)}
      >
        {" "}
        opacity{" "}
      </button>
      <canvas
        onClick={handleClick}
        className="shader-canvas"
        ref={canvasRef}
      ></canvas>
    </>
  );
}
