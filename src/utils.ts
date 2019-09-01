export const setPosition = (node, x: number, y: number) => {
  node.relativeTransform = [[1, 0, x], [0, 1, y]];
};

export const getNodesByIds = (ids: string[]) => {
  const all = figma.currentPage.findAll(n => ids.includes(n.id));
  return (figma.currentPage.selection = [].concat(all));
};

export const selectAll = (page: PageNode) => {
  const all = figma.currentPage.findAll();
  page.selection = [].concat(all);
};
