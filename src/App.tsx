import "./App.css";
import Sketch from "./components/Sketch";
import sketch from "./sketches/test";

function App() {
  console.log("how many times we rendering here?");

  return <Sketch sketch={sketch} />;
}

export default App;
