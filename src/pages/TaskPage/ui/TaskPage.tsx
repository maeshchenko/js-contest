import { useState } from "react";
import cls from "./TaskPage.module.scss";
import Split from "react-split";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
  // probably you might want to add the currentTarget as well
  // currentTarget: T;
};

export const Comp1 = () => {
  return <div>Hello</div>;
};
export const Comp2 = () => {
  return <div>Goodbuy</div>;
};
const sendCode = async (code: string) => {
  const url =
    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*";
  const opt = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "a1407edb09msha459c6d47b6e3efp1e0501jsn93d290c0cc2e",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    body: JSON.stringify({
      language_id: 94,
      base64_encoded: true,
      source_code: code,
    }),
  };

  try {
    const response = await fetch(url, opt);
    const result = await response.text();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const getAnswerByToken = async (token: string) => {
  const tokenNum = JSON.parse(token)?.token;
  const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenNum}?base64_encoded=true`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a1407edb09msha459c6d47b6e3efp1e0501jsn93d290c0cc2e",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const sleep = async (time: number) => {
  await new Promise((res) => {
    setTimeout(res, time);
  });
};

export const TaskPage = () => {
  const [value, setValue] = useState("");
  const clickHandler = async () => {
    console.log("value: ", value);
    console.log("btoa: ", btoa(value));
    const response = await sendCode(btoa(value || "return 1"));
    console.log(response);
    await sleep(2000);
    console.log("HELLO");
    if (JSON.parse(response)?.token) {
      const answer = await getAnswerByToken(response);

      const out = JSON.parse(answer)?.stdout;

      if (out === null) {
        console.log("stdout: null");
      } else {
        console.log("stdout: ", atob(JSON.parse(answer)?.stdout) || "error");
      }
    }
  };

  return (
    <Split className={cls["split"]}>
      <div>Hi</div>
      <button onClick={clickHandler}>Отравить</button>
      <ReactCodeMirror
        value={value}
        height={"80vh"}
        theme={vscodeDark}
        extensions={[javascript()]}
        autoFocus={true}
        onChange={(value) => setValue(value)}
      />
    </Split>
  );
};
