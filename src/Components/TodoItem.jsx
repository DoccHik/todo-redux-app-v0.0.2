import React from "react";
import styles from "../styles/modules/TodoItem.module.scss";

import { MdDelete, MdEdit, MdPassword } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../slices/todoSlice";
import { toast } from "react-hot-toast";
import TodoModal from "./TodoModal";
import CheckButton from "./CheckButton";
// import { format } from "date-fns/esm";s
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// animation FramerMotion
const child = {
  hidden: { y: 20, opacity: 0 },
  vissible: {
    y: 0,
    opacity: 1,
  },
};

const TodoItem = ({ todo }) => {
  // useDispatch
  const dispatch = useDispatch();

  // useState
  const [updateModalOpen, setUpdateModalOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    if (todo.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  // HandleDeleteTodo
  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Задача удалена");
  };

  // HandleUpdateTodo
  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({ ...todo, status: checked ? "incomplete" : "complete" })
    );
  };
  return (
    <>
      <motion.div
        className={styles["todo-item"]}
        variants={child}
        // exit={{ opacity: 0 }}
      >
        <div className={styles["todo-item-details"]}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles["todo-item__texts"]}>
            <p
              className={
                todo.status === "complete"
                  ? styles["todo-item__title-complete"]
                  : styles["todo-item__title"]
              }
            >
              <Link to={`/notes/${todo.id}`}>{todo.title}</Link>
            </p>
            <p className={styles["todo-item__time"]}>{todo.time}</p>
          </div>
        </div>
        <div className={styles["todo-item-actions"]}>
          <div
            className={styles["todo-item-actions__icon"]}
            onClick={handleDelete}
          >
            <MdDelete></MdDelete>
          </div>
          <div
            className={styles["todo-item-actions__icon"]}
            onClick={handleUpdate}
          >
            <MdEdit></MdEdit>
          </div>
        </div>
      </motion.div>
      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
      />
    </>
  );
};

export default TodoItem;
