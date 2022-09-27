import { typeOf } from "../helper";
import errorMessage from "../errorMessage";
import error from "../error";
import {
  validatorMainNode,
} from "../linter";
import Type from "./type"

import reqChild  from "./children";

const recursive = (funct) => {
  console.log(funct)
  let haveDop = false;
  let functionObject = {};

  if (funct["props"] !== undefined) {
    functionObject = {
      ...funct["props"]
    }
    haveDop = true;
  }

  if (funct["child"] !== undefined) {
    functionObject["children"] = funct['child'];
    haveDop = true;
  }

  const completeFunction = haveDop ? funct["tag"]({
    ...functionObject
  }) : funct["tag"]();
  const typeCompleteFunction = typeOf(completeFunction);
  if (typeCompleteFunction !== "object") {
    error(`index in array ${index} - ${TYPE_MESSAGE.functionInTagReturn}`);
  }

  if (typeof completeFunction["tag"] === "function") {
    return recursive(completeFunction);
  }

  return completeFunction;
}

const s = (app) => {
  console.log(app);
  if (typeOf(app) !== "function")
    error(`${app} - ${errorMessage.appNotAFunction}`);
  
  let mainNode = app();
  if (typeOf(mainNode) !== "object")
    error(`${mainNode} - ${errorMessage.resultCallNotAObject}`);
  // check mainNode
  validatorMainNode(mainNode);

  if (typeof mainNode["tag"] === "function")
    mainNode = recursive(mainNode);

  let {props, child} = mainNode;
  if (child !== undefined) {
    child = child.flat();
    mainNode["child"] = reqChild(props, child);
  }
  mainNode["type"] = Type.Component;
  mainNode["reload"] = function() {};
  return mainNode;
}

export default s;