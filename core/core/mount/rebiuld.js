import { addProps } from "./addProps";
import { addChild } from "./addChild"

const cNodes = (app, node) => {
  const { tag, props, child } = node;
  const Tag = document.createElement(tag);
  node["node"] = Tag;

  if (props !== undefined && Object.keys(props).length > 0) {
    addProps(Tag, props, node);
  }
  if (child !== undefined && child.length > 0) {
    node["child"] = addChild(Tag, child, cNodes);
  }
  if (app === null) return Tag;

  app.appendChild(Tag);
  return node;
}

export const createNodeRebuild = cNodes;