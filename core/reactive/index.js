const f = (object) => {
  const p = {
    parent: [],
    value: object,
  }

  return new Proxy(p, {
    get(target, prop) {
      if (prop === "type") return "proxy";
      if (prop in target) {
        return target[prop];
      }
    },
    set(target, prop, value) {
      if (prop in target) {
        if (prop === "value") {
          const parents = target.parent;
          parents.forEach((el) => {
            if (el.type === "child") {
              if (el.value.nodeType === 3) {
                el.value.nodeValue = value;
              }
            }
            if (el.type === "props") {
              el.value.setAttribute(el.key, value);
            }
          });
        }

        target[prop] = value;
        return true;
      } else {
        return false;
      }
    }
  })
}

export const ref =  f;
