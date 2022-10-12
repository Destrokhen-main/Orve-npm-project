import { ref, watch } from "sreact";
import img from "./img";
import button from "./button/button";

const comp = () => {
  const obj = ref(1);
  const input = ref("");

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
      },
      {
        tag: "div",
        child: [
          {
            tag: "p",
            child: [
              "Ты написал: ",
              input,
              "<br/>",
              {
                tag: "input",
                props: {
                  placeholder: "Введи что-то",
                  "@input": (e) => {
                    input.value = e.target.value;
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  }
}

export default comp;