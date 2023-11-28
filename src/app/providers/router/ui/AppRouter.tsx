import { ListPage } from "pages/ListPage";
import { Route, Routes } from "react-router-dom";
import { TaskPage } from "pages/TaskPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={"/"} element={<ListPage />} />
      <Route path={"list"} element={<ListPage />} />
      <Route path={"list/:id"} element={<TaskPage />} />

      <Route path={"*"} element={<ListPage />} />
    </Routes>
  );
};
