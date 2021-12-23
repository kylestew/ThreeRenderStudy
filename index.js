import { createApp, AppActions } from "./src/state";
import { createGUI } from "./src/gui";
import Renderer from "./src/renderer";

import Stats from "stats.js";

let app, stats, renderer;

init();
animate();

function init() {
  app = createApp();

  createGUI(app);

  stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  renderer = new Renderer();

  window.onresize = onWindowResize;
  onWindowResize(); // set initial size

  // watch app state for changes
  app.subscribe(updateState);
  updateState();
}

function updateState() {
  console.log("state:", app.getState());
  renderer.updateState(app.getState());
}

function animate(time) {
  if (stats) stats.begin();
  renderer.render(time);
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
