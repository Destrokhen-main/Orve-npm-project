import { ref } from "../../core";

const img = () => {
  return {
    tag: "img",
    props: {
      src: require("@/assets/logo.png"),
      class: "img"
    }
  }
}

const comp = () => {
  const obj = ref(1);
  const boolean = ref(true);

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
            tag:"button",
            props: {
              "@click": function () {
                console.log("click");
              },
              class: "btn"
            },
            child: [
              "say hi"
            ]
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
          obj,
          {
            tag: "span",
            child: [" hi "]
          },
        ]
      }
    ]
  }
}

export default comp;