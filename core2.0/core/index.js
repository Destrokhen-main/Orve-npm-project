import builder from "./builder";
import mount from "./mount";


let NODE_THREE = null;

const mounter = (query) => {
  mount(NODE_THREE, query);
}


export default (app) => {
  NODE_THREE = builder(app);
  return {
    mount: mounter
  };
};