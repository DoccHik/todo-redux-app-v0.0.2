import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/modules/CurrentTodoPage.module.scss";
import Button from "../Components/Button";
import { motion } from "framer-motion";

const CurrentTodoPage = ({ todoList }) => {
  const [openTextEditor, setOpenTextEditor] = useState(false);
  const [description, setDescription] = useState("Тестовое описание");
  const { id } = useParams();
  // console.log("useParams => id:", id);

  const currentTodo = todoList.map((todo) => todo);
  // console.log(currentTodo);

  return (
    <>
      <div className={styles["current-todo__container"]}>
        <div className={styles["current-todo__header"]}>
          <Link to="/" className={styles["current-todo__back"]}>
            Вернуться назад
          </Link>
          <h1 className={styles["current-todo__time"]}>
            {currentTodo.map((todo) => todo.id === id && todo.time)}
          </h1>
        </div>
        <h1 className={styles["current-todo__title"]}>
          {currentTodo.map((todo) => todo.id === id && todo.title)}
        </h1>
        <form>
          {openTextEditor && (
            <motion.textarea
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              placeholder="Введите описание"
              // exit={{ animationDelay: 0.3 }}
              className={styles["current-todo__description"]}
              name="description"
              id="description"
              cols="30"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></motion.textarea>
          )}
          <Button
            variant="primary"
            onClick={() => setOpenTextEditor(!openTextEditor)}
          >
            Добавить описание
          </Button>
        </form>
      </div>
    </>
  );
};

export default CurrentTodoPage;
