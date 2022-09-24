import builder from "./builder";
import mount from "./mount";

export default (app) => {
  window.sReactDOM = builder(app);
  return {
    mount: (query) => {
      window.sReactDOM = mount(query);
    }
  };
};