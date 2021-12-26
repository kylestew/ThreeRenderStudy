import createState from "./src/state";
import createGUI from "./src/gui";
import Renderer from "./src/renderer";
import Stats from "stats.js";

let state, stats, renderer;

init();
animate();

function init() {
  renderer = new Renderer();

  state = createState(updateState);
  updateState();

  createGUI(state);

  stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  window.onresize = onWindowResize;
  onWindowResize(); // set initial size
}

function updateState() {
  renderer.updateState(state);
}

function animate(time) {
  if (stats) stats.begin();
  renderer.render(time / 1000.0, state);
  if (stats) stats.end();
  requestAnimationFrame(animate);
}

function onWindowResize() {
  renderer.resize({
    width: window.innerWidth,
    height: window.innerHeight,
    dpr: window.devicePixelRatio,
  });
}
