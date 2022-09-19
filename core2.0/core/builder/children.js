import { typeOf } from "../helper";
import { validatorTagNode } from "../linter";
import Type from "./type";
import error from "../error";
import TYPE_MESSAGE from "../errorMessage";

const HTML_TAG = ["br","hr"];

const recursiveChild = (nodeProps = null, nodeChilds) => {
  if (nodeChilds !== undefined && nodeChilds.length > 0) {
    return nodeChilds.map((child, index) => {
      const typeChild = typeOf(child);

      if (typeChild === "string") {
        if (child.startsWith("<") && child.endsWith(">")) {
          const parsedTag = child.replace(/[<,>,\/]/, "").trim();
          if (HTML_TAG.includes(parsedTag)) {
            return {
              type: Type.Component,
              value: {
                tag: "parsedTag",
              }
            }
          }
        }
      }

      if (typeChild === "string" || typeChild === "number") {
        return {
          type: Type.NotMutable,
          value: child
        }
      }

      if (typeChild === "object") {
        validatorTagNode(child);

        if(typeof child["tag"] === "function") {
          const completeFunction = child["props"] !== undefined ? child["tag"](child["props"]) : child["tag"]();
          const typeCompleteFunction = typeOf(completeFunction);
          if (typeCompleteFunction !== "object") {
            error(`index in array ${index} - ${TYPE_MESSAGE.functionInTagReturn}`);
          }
          
          if (completeFunction["child"] !== undefined)
            completeFunction["child"] = recursiveChild(completeFunction["props"], completeFunction["child"]);

          return {
            type: Type.Component,
            value: completeFunction,
          }
        } else {
          if (child["child"] !== undefined)
            child["child"] = recursiveChild(child["props"], child["child"]);
        }

        return {
          type: Type.Component,
          value: child
        }
      }

      if (typeChild === "function") {
        const completeFunction = nodeProps !== undefined ? child(nodeProps) : child();
        const typeCompleteFunction = typeOf(completeFunction);
        if (typeCompleteFunction === "object") {
          validatorTagNode(completeFunction);
          if (completeFunction["child"] !== undefined)
            completeFunction["child"] = recursiveChild(completeFunction["props"], completeFunction["child"]);

          return {
            type: Type.ComponentMutable,
            value:completeFunction,
            function: child,
          }
        }

        if (typeCompleteFunction === "string" || typeCompleteFunction === "number") {
          return {
            type: Type.Mutable,
            value: completeFunction,
            function: child
          }
        }
      }
    });
  } else {
    return [];
  }

}

export default recursiveChild;