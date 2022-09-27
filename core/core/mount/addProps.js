import { validSingleProps } from "../linter";
const toStyleString = require('to-style').string;
import { typeOf } from "../helper";

const Props = (tag, props, node) => {
  Object.keys(props).forEach((pr) => {
    if (pr === "src") {
      // check for function
      //let img = props[pr].default.split("/");
      tag.setAttribute(pr, props[pr].default);
    } else if (pr.startsWith("@")) {
      const name = pr.replace("@", "").trim();
      const func = props[pr].bind(node);
      tag.addEventListener(name, func);
    } else if (pr === "style") {
      // check for function
      let sheet;
      if (typeOf(props[pr]) === "string") {
        sheet = props[pr];
      } else {
        sheet = toStyleString(props[pr]);
      }
      if (sheet.length !== 0)
        tag.setAttribute("style", sheet);
    } else if (typeOf(props[pr]) === "proxy") {
      tag.setAttribute(pr, props[pr].value);
      props[pr].parent.push({
        type: "props",
        value: tag,
        key: pr
      })
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

export const addProps = Props;