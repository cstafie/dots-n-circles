import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sketch from "./components/Sketch.tsx";
import demoOverlaySketch from "./sketches/demOverlay.ts";
import Shader from "./components/Shader.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sketch sketch={demoOverlaySketch} />,
  },
  {
    path: "/demo",
    element: <Sketch sketch={demoOverlaySketch} />,
  },
  {
    path: "/shader",
    element: <Shader />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
