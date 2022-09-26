import error from "../core/error";
import { typeOf } from "../core/helper";

const w = (callback, depends) => {
  if (depends === undefined) {
    error("Нет зависимостей для ")
  }

  if (typeOf(depends) !== 'proxy') {
    error("Вы можете наблюдать только за proxy");
  }

  depends.parent.push({
    type: "watch",
    function: callback
  });
}

export const watch = w;