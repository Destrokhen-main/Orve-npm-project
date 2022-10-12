import style from "./button.sc.scss";

const button = (props) => {
  return {
    tag: "button",
    props: {
      "@click": function () {
        console.log("click");
      },
      class: style.btn
    },
    child: [
      ...props.text
    ]
  }
}

export default button;