import { script as io } from './io.js';

figma.showUI(__html__, {
  width: 248,
  height: 124,
});

io.on("set-width", (data) => {
  const { anchor, width, layer } = data;

  const node = figma.currentPage.selection[0];

  if(anchor === "left") {
    node.resize(width, node.height);
  } else if(anchor === "center") {
    const currentX = node.relativeTransform[0][2];
    const multiplier = node.width >= width ? -1 : 1;

    node.relativeTransform = [
      [1, 0, currentX - (multiplier * Math.abs(width - node.width) / 2)],
      node.relativeTransform[1],
    ];

    node.resize(width, node.height);
  }
  else if (anchor === "right") {
    const currentX = node.relativeTransform[0][2];
    node.relativeTransform = [
      [1, 0, currentX - width + node.width],
      node.relativeTransform[1],
    ];

    node.resize(width, node.height);
  }
});

io.on("set-height", (data) => {
  
  const { anchor, height, layer } = data;

  const node = figma.currentPage.selection[0];

  if(anchor === "top") {
    node.resize(node.width, height);
  } else if(anchor === "middle") {
    const currentY = node.relativeTransform[1][2];

    const multiplier = node.height >= height ? -1 : 1;

    node.relativeTransform = [
      node.relativeTransform[0],
      [0, 1, currentY - (multiplier * Math.abs(height - node.height) / 2)],
    ];

    node.resize(node.width, height);
  }
  else if (anchor === "bottom") {
    const currentY = node.relativeTransform[1][2];
    node.relativeTransform = [
      node.relativeTransform[0],
      [0, 1, currentY - height + node.height],
    ];

    node.resize(node.width, height);
  }
});

setInterval(() => {
  const { selection } = figma.currentPage;

  io.send("selection", selection.map(s => ({
    id: s.id,
    width: s.width,
    height: s.height,
  })));
}, 150);
