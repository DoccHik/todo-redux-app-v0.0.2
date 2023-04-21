import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/modules/CurrentTodoPage.module.scss";
import Button from "../Components/Button";
import { motion } from "framer-motion";
// import ModalDescription from "../Components/ModalDescription";
import { toast } from "react-hot-toast";

const CurrentTodoPage = ({ todoList }) => {
  // console.log(todoList);

  // Получение id с url
  const { id } = useParams();
  // console.log("useParams => id:", id);

  const [description, setDescription] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  // console.log(dateEnd);

  // todo Добавить сохранение занчения с textarea в localStorage
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const saveDescription = (description) => {
    // console.log(description);

    const todoList = window.localStorage.getItem("todoList");

    if (todoList) {
      const todoListArr = JSON.parse(todoList);
      todoListArr.map(
        (todo) => todo.id === id && (todo.description = description)
      );
      window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
      toast.success("Заметка изменена");
    }
  };

  // Сохранение срока выполнения задачи в localStorage
  const onChangeDateEnd = (e) => {
    setDateEnd(e.target.value);
  };

  // todo Создать отображение срока выполнения задачи
  const getNumberOfDays = (start, end) => {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in millesecons
    const oneDay = 1000 * 60 * 60 * 24;

    // Вычисление разницы между двумя датами в миллисекундах
    const diffInTime = date2.getTime() - date1.getTime();

    // Разница между датами
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  };

  // console.log(getNumberOfDays("4/20/2023", "4/21/2023"));

  const todoListArr = todoList.map((todo) => todo);
  // console.log(todoListArr);

  // Сохранение описания в localStorage
  useEffect(() => {
    const todoList = window.localStorage.getItem("todoList");
    if (todoList) {
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.map((todo) =>
          todo.id === id ? setDescription(todo.description) : null
        );
      }
    }
  }, []);

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
          <span className={styles["current-todo__description-title"]}>
            Заметки
          </span>
          <textarea
            className={styles["current-todo__description-textarea"]}
            name="description"
            id="description"
            // cols="30"
            // rows="10"
            maxLength={300}
            value={description}
            onChange={handleDescription}
            placeholder="Введите описание..."
          />
        </p>
        <div className={styles["current-todo__options"]}>
          <Button
            variant="primary"
            onClick={() => saveDescription(description)}
          >
            Сохранить
          </Button>
          <label className={styles["current-todo__options-label"]}>
            <small className={styles["current-todo__options-label-title"]}>
              Выполнить до:
            </small>
            <input
              className={styles["current-todo__dateEnd"]}
              type="date"
              name="dateEnd"
              id="dateEnd"
              value={dateEnd}
              onChange={onChangeDateEnd}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default CurrentTodoPage;
