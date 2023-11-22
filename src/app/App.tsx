import "./styles/index.scss";
import React from "react";
import ContrastSymbol from "shared/assets/contrast-symbol.svg";
import contrastSymbolPNG from "shared/assets/spidy.png";

export const App = () => {
  return (
    <React.Fragment>
      <ContrastSymbol />
      <h1 className={"header"}>Hello world from App!</h1>
      <img
        src={contrastSymbolPNG}
        alt="With great power there must also come great responsibility"
      />
    </React.Fragment>
  );
};
