import { typeOf } from "../helper";
import errorMessage from "../errorMessage";
import error from "../error";
import {
  validatorMainNode,
} from "../linter";
import Type from "./type"

import reqChild  from "./children";

const func = (app) => {
  if (typeOf(app) !== "function") error(`${app} - ${errorMessage.appNotAFunction}`);
  const mainNode = app();
  if (typeOf(mainNode) !== "object") error(`${mainNode} - ${errorMessage.resultCallNotAObject}`);

  // check mainNode
  validatorMainNode(mainNode);

  let {props, child} = mainNode;
  if (child !== undefined) {
    child = child.flat(1);
    mainNode["child"] = reqChild(props, child);
  }
  mainNode["type"] = Type.Component;
  return mainNode;
}

export default func;