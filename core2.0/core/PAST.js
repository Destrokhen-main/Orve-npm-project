const rebuild = (tag) => {
  tag.node.innerHTML = "";
  for (const key in tag.props) {
    if (key.startsWith("@")) {
      const parsedKey = key.replace('@', '').toLowerCase();
      if (parsedKey.endsWith("@")) {
        const p = parsedKey.replace("@", "");
        const callback = tag.props[key]();
        tag.node.addEventListener(p, callback);
        tag.node["on" + p] = callback;
      } else {
        if (tag.node["on" + parsedKey] === null) {
          if (tag.props[key]) {
            tag.node.addEventListener(p, tag.props[key]);
            tag.node["on" + parsedKey] = tag.props[key];
          }
        }
      }
    } else if (key.endsWith("@")) {
      const p = key.replace("@", "");
      const callback = tag.props[key]();
      tag.node.setAttribute(p, callback);
    } else {
      if (typeof tag.props[key] === "function") {
        const callback = tag.props[key]();
        tag.node.setAttribute(key, callback);
      } else if (typeof tag.props[key] === "object" && tag.props[key].tpof === "Proxy")
        tag.node.setAttribute(key, tag.props[key].value);
      else
        tag.node.setAttribute(key, tag.props[key]);
    }
  }

  for (let i of tag.children) {
    const type = typeof i;
    if (type === "object") {
      if (i.tpof === "Proxy") {
        tag.node.innerHTML += i.value;
      } else {
        tag.node.innerHTML += JSON.stringify(i);
      }
    } else {
      tag.node.innerHTML += i;
    }
  }
}

function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

const s = (ap ,app) => {
  const obj = app();
  const proxyObj = new Proxy({
    ...obj,
    node: null,
    reload: null,
  }, {
    set(target, prop, value) {
      if (prop === "reload") {
        rebuild(target);
        return true;
      } else {
        if (prop in target) {
          target[prop] = value;
          return true;
        } else {
          return false;
        }
      } 
    },
    get(target, prop) {
      if (prop in target)
        return target[prop]
      else
        return undefined;
    }
  })
  const tag = document.createElement(obj.tag);
  for (const key in obj.props) {
    if (key.startsWith("@")) {
      const parsedKey = key.replace('@', '').toLowerCase();
      
      if (parsedKey.endsWith("@")) {
        const p = parsedKey.replace('@', '');
        const callback = obj.props[key]();
        tag["on" + p] = callback;
      } else {
        tag["on" + parsedKey] = obj.props[key];
      }
    } else if (key.endsWith("@")) {
      const p = key.replace("@", "");
      const callback = obj.props[key]();
      tag.setAttribute(p, callback);
    } else {
      if (typeof obj.props[key] === "function") {
        const callback = obj.props[key]();
        tag.setAttribute(key, callback);
      } else if (obj.props[key].tpof)
        tag.setAttribute(key, obj.props[key].value);
      else
        tag.setAttribute(key, obj.props[key]);
    }
  }

  for (let i of obj.children) {
    const type = typeof i;
    if (type === "object") {
      if (i.tpof === "Proxy") {
        i.parent = proxyObj;
        tag.innerText += i.value;
      } else {
        tag.innerText += JSON.stringify(i);
      }
    } else {
      tag.innerText += i;
    }
  }
  proxyObj.node = tag;
  ap.appendChild(tag);
}