import store from "./src/store";
import { createGUI } from "./src/gui";
import Renderer from "./src/renderer";
import Stats from "stats.js";

let stats, renderer;

init();
animate();

function init() {
  createGUI(store);

  stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  renderer = new Renderer();

  window.onresize = onWindowResize;
  onWindowResize(); // set initial size

  // watch app state for changes
  store.subscribe(updateState);
  updateState();
}

function updateState() {
  console.log("UPDATE STATE", store.getState());
  renderer.updateState(store.getState());
}

function animate(time) {
  if (stats) stats.begin();
  renderer.render(time);
  if (stats) stats.end();
  // requestAnimationFrame(animate);
}

function onWindowResize() {
  renderer.resize({
    width: window.innerWidth,
    height: window.innerHeight,
    dpr: window.devicePixelRatio,
  });
}
