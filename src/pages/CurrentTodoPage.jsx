import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/modules/CurrentTodoPage.module.scss";
import Button from "../Components/Button";
import { motion } from "framer-motion";
import ModalDescription from "../Components/ModalDescription";

const CurrentTodoPage = ({ todoList }) => {
  const [openDescriptionModal, setOpenDescriptionModal] = React.useState(false);
  const [vissbleDescription, setVissbleDescription] = React.useState(false);
  const [description, setDescription] = React.useState("");

  // Получение id с url
  const { id } = useParams();
  // console.log("useParams => id:", id);

  const todoListArr = todoList.map((todo) => todo);
  // console.log(todoListArr);

  useEffect(() => {
    todoListArr.map((todo) => {
      if (todo.id === id) {
        console.log(todo);
        setVissbleDescription(true);
      }
    });
  }, [todoList]);

  return (
    <>
      <div className={styles["current-todo__container"]}>
        <div className={styles["current-todo__header"]}>
          <Link to="/" className={styles["current-todo__back"]}>
            Вернуться назад
          </Link>
          <h1 className={styles["current-todo__time"]}>
            {todoListArr.map((todo) => todo.id === id && todo.time)}
          </h1>
        </div>
        <h1 className={styles["current-todo__title"]}>
          {todoListArr.map((todo) => todo.id === id && todo.title)}
        </h1>
        <p className={styles["current-todo__description"]}>
          {vissbleDescription
            ? todoListArr.map((todo) => todo.id === id && todo.description)
            : "Нет описания"}
        </p>
        <Button variant="primary" onClick={() => setOpenDescriptionModal(true)}>
          Добавить описание
        </Button>
      </div>
      {openDescriptionModal && (
        <ModalDescription
          description={description}
          setDescription={setDescription}
          todoListArr={todoListArr}
          openDescriptionModal={openDescriptionModal}
          setOpenDescriptionModal={setOpenDescriptionModal}
        />
      )}
    </>
  );
};

export default CurrentTodoPage;
