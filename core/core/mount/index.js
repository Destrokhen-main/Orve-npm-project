import error from "../error";

import { createNode } from "./createNode";

export default (query) => {
  const APP = document.querySelector(query);
  const node = window.sReactDOM;

  if (APP === null)
    error("Не смог найти tag " + query);

  return createNode(APP, node);
}