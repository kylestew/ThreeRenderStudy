import createState from "./src/state";
import createGUI from "./src/gui";
import Renderer from "./src/renderer";
import Stats from "stats.js";

let state, stats, renderer, prevTime;

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
  if (prevTime === undefined) prevTime = time;
  const deltaTime = Math.max(time - prevTime, 0);
  prevTime = time;
  if (stats) stats.begin();
  renderer.render(time / 1000.0, deltaTime / 1000.0, state);
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
