import { script as io } from './io';

figma.showUI(__html__, {
  width: 504,
  height: 640,
});

io.on("run", (automation) => {
  // automation
});

setInterval(() => {
  const { selection } = figma.currentPage;

  io.send("selection", selection.map(s => ({
    id: s.id,
    width: s.width,
    height: s.height,
  })));
}, 150);
