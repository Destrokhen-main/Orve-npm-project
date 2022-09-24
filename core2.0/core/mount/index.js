import error from "../error";
import { typeOf } from "../helper";
import Type from "../builder/type";
import { validSingleProps } from "../linter";
const toStyleString = require('to-style').string;

const addProps = (tag, props, node) => {
  Object.keys(props).forEach((pr) => {
    if (pr === "src") {
      const img = props[pr].default.split("/");
      img.splice(0, 3);
      tag.setAttribute(pr, img.join('/'));
    } else if (pr.startsWith("@")) {
      const name = pr.replace("@", "").trim();
      const func = props[pr].bind(node);
      tag.addEventListener(name, func);
    } else if (pr === "style") {
      let sheet;
      if (typeOf(props[pr]) === "string") {
        sheet = props[pr];
      } else {
        sheet = toStyleString(props[pr]);
      }
      if (sheet.length !== 0)
        tag.setAttribute("style", sheet);
    } else  {
      if (typeOf(props[pr]) === "function") {
        const func = props[pr].bind(node);
        const parsedProp = func();
        validSingleProps(parsedProp, pr);
        tag.setAttribute(pr, parsedProp);
      } else {
        tag.setAttribute(pr, props[pr]);
      }
    }
  })
}

const addChild = (app, child) => {
  return child.map(ch => {
    if (ch.type === Type.NotMutable) {
      app.innerHTML += ch.value;
      return ch;
    }

    if (ch.type === Type.Component || ch.type === Type.ComponentMutable) {
      return createNode(app, ch.value);
    }
  })
}

const createNode = (app, node) => {
  const { tag, props, child } = node;
  const Tag = document.createElement(tag);

  if (props !== undefined && Object.keys(props).length > 0) {
    addProps(Tag, props, node);
  }
  
  if (child !== undefined && child.length > 0) {
    node["child"] = addChild(Tag, child);
  }
  node["node"] = Tag;
  app.appendChild(Tag);
  return node;
}

export default (query) => {
  const APP = document.querySelector(query);
  const node = window.sReactDOM;

  if (APP === null)
    error("Не смог найти tag " + query);

  return createNode(APP, node);
}