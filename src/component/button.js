const button = (props) => {
  return {
    tag: "button",
    props: {
      "@click": function () {
        console.log("click");
      },
      class: "btn"
    },
    child: [
      ...props.text
    ]
  }
}

export default button;