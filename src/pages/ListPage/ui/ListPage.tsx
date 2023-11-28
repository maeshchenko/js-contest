import React from "react";
import { Link } from "react-router-dom";
import cls from "./ListPage.module.scss";

const DATA = [
  {
    title: "Closures",
    tasks: [
      {
        id: 2667,
        title: "Create Hello World Function",
        isSolved: true,
      },
      {
        id: 2620,
        title: "Counter",
        isSolved: false,
      },
    ],
  },
];

export const ListPage = () => {
  return (
    <div className={cls["ListPage__list"]}>
      {DATA[0].tasks.map((item) => {
        return (
          <Link key={item.id} to={`/list/${item.id}`}>
            <div className={cls["ListPage__list-item"]}>
              <p>{item.id}</p>
              <p>{item.title}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
