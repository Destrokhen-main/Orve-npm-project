const reactive = (def) => {
  const obj = {
    parent: [],
    value: def,
  };
  return new Proxy(obj, {
    set(target, prop, value) {
      if (prop in target) {
        target[prop] = value;
        if (prop === "value") {
          target.parent.forEach(par => {
            par.value["reBuild"] = { newValue: target.value, kParent: par };
          })
        }
        return true;
      } else {
        return false;
      }
    },
    get(target, prop) {
      if (prop === "tppx") return "ProxyValue";
      if (prop === "tpof") return "Proxy";
      if (prop in target) {
        return target[prop]
      } else {
        return undefined;
      }
    }
  })
}

export default reactive;