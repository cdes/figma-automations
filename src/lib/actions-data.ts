
function getNodesByIds(ids:[]) {
  const all = figma.currentPage.findAll(n => n.id === "Color");
  return figma.currentPage.selection = [].concat(all);
}

function selectAll(page: PageNode) {
  const all = figma.currentPage.findAll();
  page.selection = [].concat(all);
}

const actionsData = {
  actions: {
    "delete": {
      id: "delete",
      name: "Delete Layer",
      run(ids: [] = []) {
        let target: readonly SceneNode[];

        if(ids.length === 0) {
          target = figma.currentPage.selection;
        }
        else {
          target = getNodesByIds(ids);
        }

        target.map(node => {node.remove()});
      }
    },
    "select-all": {
      id: "select-all",
      name: "Select All Layers",
      run() {
        selectAll(figma.currentPage);
      }
    },
    "rename": {
      id: "rename",
      name: "Rename Layer",
      run(nodes: BaseNode[], newName: string) {
        nodes.map(node => node.name = newName);
      }
    },
    "each": {
      id: "each",
      name: "Each"
    }
  },
  automation: [],
}

export default actionsData;