import { script as io } from './lib/io.js';
import actionsData from './lib/actions-data';

const { actions } = actionsData;

figma.showUI(__html__, {
  width: 504,
  height: 400,
});

io.on("run", (automation) => {
  automation.map((id => actions[id].run()));
});

setInterval(() => {
  const { selection } = figma.currentPage;

  io.send("selection", selection.map(s => ({
    id: s.id,
    width: s.width,
    height: s.height,
  })));
}, 150);
