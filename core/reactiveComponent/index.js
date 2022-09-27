import Type from "../type/proxy";

import builder from "../core/builder";
import { createNodeRebuild } from "../core/mount/rebiuld"

const s = (component) => {
  const object = {
    parent: [],
    value: component,
  }

  return new Proxy(object, {
    get(target, prop) {
      if (prop === "type") return "proxy";
      if (prop === "typeProxy") return Type.proxyComponent;
      if (prop in target) {
        return target[prop];
      }
    },
    set(target, prop, value) {
      if (prop in target) {
        target[prop] = value;

        if (prop === "value") {
          if (target.parent.length > 0) {
            let newObj = builder(value);
            const object  = createNodeRebuild(null, newObj);
            target.parent = target.parent.map((el) => {
              el.insertAdjacentElement('afterend', object);
              el.remove();
              return object;
            })
          }
        }

        return true;
      }
      return false;
    }
  })
}

export const refC = s;