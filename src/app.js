import "./style.scss";
import helloWorld from "./component/helloword";

const App = () => {
  return {
    tag: "div",
    props: {
      class: "app block",
    },
    child: [
      helloWorld
    ]
  }
}

export default App;