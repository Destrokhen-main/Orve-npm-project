import error from "../error";
import { typeOf, isTypeOfProxyValue } from "../helper";
import Type from "../builder/type";

const addProps = (tag, props) => {
  Object.keys(props).forEach((pr) => {
    if (pr === "src") {
      const img = props[pr].default.split("/");
      img.splice(0, 3);
      tag.setAttribute(pr, img.join('/'));
    } else if (pr.startsWith("@")) {
      const name = pr.replace("@", "").trim();
      tag.addEventListener(name, props[pr]);
    } else {
      tag.setAttribute(pr, props[pr]);
    }
  })
}

const addChild = (app, child) => {
  child.forEach(ch => {
    if (ch.type === Type.NotMutable) {
      app.innerHTML += ch.value;
    }

    if (ch.type === Type.Component || ch.type === Type.ComponentMutable) {
      createNode(app, ch.value);
    }
  })
}

const createNode = (app, node) => {
  const { tag, props, child } = node;
  const Tag = document.createElement(tag);

  if (props !== undefined && Object.keys(props).length > 0) {
    addProps(Tag, props);
  }
  
  if (child !== undefined && child.length > 0) {
    addChild(Tag, child);
  }

  app.appendChild(Tag);
}

const mainBuilder = (app, node) => {
  createNode(app, node);
}

export default (node, query) => {
  const APP = document.querySelector(query);
  
  if (APP === null) error("Не смог найти tag " + query);
  mainBuilder(APP, node);
}