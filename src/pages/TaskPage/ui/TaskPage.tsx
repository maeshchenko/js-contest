import cls from "./TaskPage.module.scss";
import Split from "react-split";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

export const Comp1 = () => {
  return <div>Hello</div>;
};
export const Comp2 = () => {
  return <div>Goodby</div>;
};

export const TaskPage = () => {
  return (
    <Split className={cls["split"]}>
      <div>Hi</div>
      <ReactCodeMirror
        value={"console.log('Hello!');\n// write your code here"}
        height={"80vh"}
        theme={vscodeDark}
        extensions={[javascript()]}
        autoFocus={true}
      />
    </Split>
  );
};
