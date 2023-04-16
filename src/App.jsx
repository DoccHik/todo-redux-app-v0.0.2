import React from "react";
import PageTitle from "./Components/PageTitle";
import styles from "./styles/modules/App.module.scss";
import AppHeader from "./Components/AppHeader";
import AppContent from "./Components/AppContent";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import CurrentTodoPage from "./pages/CurrentTodoPage";
import MainPage from "./pages/MainPage";
import { useSelector } from "react-redux";

// https://youtu.be/W0Uf_xu350k?t=9456

function App() {
  const todoList = useSelector((state) => state.todo.todoList);
  return (
    <>
      <div className="container">
        <PageTitle>Todo List</PageTitle>
        <div className={styles["app__wrapper"]}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/notes/:id"
              element={<CurrentTodoPage todoList={todoList} />}
            />
            <Route path="/*" element={<h1>Страница не найдена</h1>} />
          </Routes>
        </div>
      </div>
      <Toaster
        position="bittom-right"
        toastOptions={{
          style: {
            fontSize: "16px",
          },
        }}
      />
    </>
  );
}

export default App;
