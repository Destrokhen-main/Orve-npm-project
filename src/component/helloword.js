import { ref, watch } from "../../core";
import img from "./img";
import button from "./button";

const comp = () => {
  const obj = ref(1);

  watch((n, o) => {
    console.log(`new ${n}, old ${o}`)
  }, obj);

  return {
    tag: "div",
    props: {
      class: "block"
    },
    child: [
      img,
      {
        tag: "span",
        props: {
          class: function () {
            return "label"
          }
        },
        child: [
          "Привет, это simple reactive",
          "<br />",
          {
            tag: "div",
            props: {
              style: "margin: 10px 0;"
            },
            child: [
              "Я только разрабатываюсь, но уже кое что умею"
            ]
          },
          "<hr />",
          {
            tag: button,
            props: {
              text: "say hi"
            }
          }
        ]
      },
      {
        tag: "a",
        props: {
          href: "https://github.com/Destrokhen-main/simple-reactive-cli",
          target: "_blank"
        },
        child: [
          "Вот ссылка на git ",
        ]
      },
      {
        tag: "div",
        props: {
          "@click": () => {
            obj.value += 1;
          },
          id: obj,
        },
        child: [
          {
            tag: button,
            props: {
              text: [
                "you click (",
                obj,
                ")"
              ]
            }
          }
        ]
      }
    ]
  }
}

export default comp;