import "./styles/index.scss";
import React from "react";
import { AppRouter } from "app/providers/router";

export const App = () => {
  return (
    <div>
      <React.Suspense fallback="">
        <AppRouter />
      </React.Suspense>
    </div>
  );
};
