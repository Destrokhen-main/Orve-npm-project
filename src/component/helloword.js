const comp = () => {
  return {
    tag: "div",
    props: {
      class: "block"
    },
    child: [
      {
        tag: "img",
        props: {
          src: require("../assets/logo.png"),
          class: "img"
        }
      },
      {
        tag: "span",
        props: {
          class: "label"
        },
        child: [
          "Привет, это simple reactive",
          "<br />",
          "Я только разрабатываюсь, но уже кое что умею",
          "<br/>",
          {
            tag:"button",
            props: {
              "@click": function () {console.log("hi")}
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
          href: "https://github.com/Destrokhen-main",
          target: "_blank"
        },
        child: [
          "Вот ссылка на git"
        ]
      }
    ]
  }
}

export default comp;