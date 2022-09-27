import Type from "../builder/type";

const Child = (app, child, callback) => {
  return child.map(ch => {
    if (ch.type === Type.NotMutable) {
      const el = document.createTextNode(ch.value);
      app.appendChild(el);
      return ch;
    }

    if (ch.type === Type.Component || ch.type === Type.ComponentMutable) {
      return callback(app, ch.value);
    }

    if (ch.type === Type.Proxy) {
      const el = document.createTextNode(ch.value)
      ch.node = el;
      ch.proxy.parent.push({
        type: "child",
        value: el,
      });
      app.appendChild(el); 
      return ch;
    }

    if (ch.type === Type.ProxyComponent) {
      const el = callback(app, ch.value);
      ch.proxy.parent.push(el.node);
      return el;
    }
  });
}

export const addChild = Child;