import { createBarsRenderer } from "./gradientBarsRenderer.js";

let renderer = null;

self.onmessage = (e) => {
  const m = e.data;
  switch (m.type) {
    case "init":
      renderer = createBarsRenderer(m.canvas, m.opts);
      break;
    case "resize":
      renderer?.resize(m.w, m.h);
      break;
    case "scroll":
      renderer?.setScroll(m.detail);
      break;
    case "visible":
      renderer?.setVisible(m.value);
      break;
    case "destroy":
      renderer?.destroy();
      renderer = null;
      self.close();
      break;
  }
};