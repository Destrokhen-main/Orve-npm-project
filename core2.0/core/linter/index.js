import error from "../error";
import { typeOf } from "../helper";
import errorMessage from "../errorMessage";

const SUPPORTED_VARIABLES = ["tag", "props", "child"];
const SUPPORTED_TYPE_PROPS = ["function", "string", "proxy", "number", "object"];
const SUPPORTED_TYPE_CHILDREN = ["function", "string", "proxy", "object", "number"];


const validatorProps = (props) => {
  if (typeOf(props) !== "object") error(errorMessage.propsNotAObject);

  // check all variables in object props
  Object.keys(props).forEach((key) => {

    const value = props[key];

    // this is event function
    if (key.startsWith("@")) {
      if (typeOf(value) !== "function") error(`${key} - ${errorMessage.eventNotAFunction}`);
    }
    if (typeOf(value) === "object") {
      if (value["__esModule"] === undefined && value["default"] === undefined)
        error(`${key} - ${errorMessage.incorrectPropsValue}`)
    } else if (!SUPPORTED_TYPE_PROPS.includes(typeOf(value)))
      error(`${key} - ${errorMessage.incorrectPropsValue}`);
  });
}

const validatorChild = (childs) => {
  childs = childs.flat(1);
  if (typeOf(childs) !== "array") error(`${childs} - ${errorMessage.childNotArray}`);

  if (childs.length > 0)
    childs.forEach((child) => { 
      if (!SUPPORTED_TYPE_CHILDREN.includes(typeOf(child))) error(`${typeOf(child)} - ${errorMessage.unsupportedTagC}`);
    });
} 

const validatorMainNode = (node) => {
  // check unsupported object variables
  Object.keys(node).forEach((key) => {
    if (!SUPPORTED_VARIABLES.includes(key)) error(`${key} - ${errorMessage.useUnsupportedVariables}`);
  });
  const { tag, props, child} = node;

  // check exist tag
  if(tag === undefined) error(errorMessage.missTagOnObject);
  if(props !== undefined) validatorProps(props);
  if(child !== undefined) validatorChild(child);
}

const SUPPORTED_CHILD_RESULT = ["string", "object"];

const validateChildFunction = (res, index) => {
  const typeResult = typeOf(res);
  if (!SUPPORTED_CHILD_RESULT.includes(typeResult)) error(`${res} | номер в массиве: ${index} - ${errorMessage.unsupportedTagC}`);
  return typeResult;
}

const TAG_TYPE_NODE = ["string", "function"];
const validatorTagNode = (node) => {
  Object.keys(node).forEach((key) => {
    if (!SUPPORTED_VARIABLES.includes(key)) error(`${key} - ${errorMessage.useUnsupportedVariables}`);
  });
  const { tag, props, child} = node;

  // check exist tag
  if(tag === undefined) error(errorMessage.missTagOnObject);

  if(!TAG_TYPE_NODE.includes(typeOf(tag))) error(`${JSON.stringify(node)} - ${errorMessage.unsupportedTag}`)
  if(typeOf(tag) === "function") {
    if (child !== undefined) error(`${tag} - ${errorMessage.usedFunctionTagWithChildren}`);
  }

  if(props !== undefined) validatorProps(props);
  if(child !== undefined) validatorChild(child);
}

export {
  validatorMainNode,
  validateChildFunction,
  validatorTagNode
}