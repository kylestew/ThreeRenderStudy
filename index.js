import { createApp, AppActions } from "./src/state";
// import { createGUI } from "./src/gui";
import Renderer from "./src/renderer";

import Stats from "stats.js";

let app, stats, renderer;

init();
animate();

function init() {
  app = createApp();

  // createGUI(app);

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

// window.onkeydown = function (evt) {
//   if (evt.key == "s") {
//     downloadCanvas();
//   } else if (evt.key == "r") {
//     if (mediaRecorder.state == "recording") {
//       mediaRecorder.stop();
//     } else {
//       mediaRecorder.start();
//       console.log("recording...");
//     }
//   }
// };

// function download(dataURL, name) {
//   const link = document.createElement("a");
//   link.href = dataURL;
//   link.download = name;
//   link.click();
// }

// function downloadCanvas() {
//   var dataURL = ctx.canvas.toDataURL("image/png");
//   download(dataURL, "image");
// }

// TODO: refactor this to be cleaner
// videoStream = canvas.captureStream(30);
// var options = { mimeType: "video/webm; codecs=vp9" };
// mediaRecorder = new MediaRecorder(videoStream, options);
// recordedChunks = [];
// mediaRecorder.ondataavailable = function (event) {
//   if (event.data.size > 0) {
//     recordedChunks.push(event.data);
//     var blob = new Blob(recordedChunks, { type: "video/webm" });
//     var videoURL = URL.createObjectURL(blob);
//     download(videoURL, "video");
//     recordedChunks = [];
//   }
// };
