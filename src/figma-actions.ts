import { setPosition, getNodesByIds, selectAll, } from "./utils";

const actionsData = {
  actions: {
    "delete": {
      id: "delete",
      name: "Delete",
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
    },
    "resize": {
      id: "resize",
      name: "Resize",
      run(nodes: SceneNode[], x, y) {
        nodes.map((node:SceneNode) => node.resize(x, y));
      }
    },
  },
  automation: [],
}

export default actionsData;