import React from "react";
import styles from "../styles/modules/TodoModal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../slices/todoSlice";

import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  vissible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};

const TodoModal = ({ type, modalOpen, setModalOpen, todo }) => {
  // States
  const [title, setTitle] = React.useState("");
  const [status, setStatus] = React.useState("incomplete");

  const dispatch = useDispatch();

  // ChangeInputValue
  const changeInputValue = (e) => {
    setTitle(e.target.value);
    if (title.length >= 29) {
      setTitle(e.target.value);
      toast.error("Слишком много символов");
    }
  };

  // // CloseWodalEscape
  // const modalCloseEsc = (e) => {
  //   window.addEventListener("keydown", (e) => {
  //     if (e.key === "Escape") {
  //       setModalOpen(false);
  //       setTitle("");
  //     }
  //   });
  // };

  // // RemoveEvent
  // const removeEventEsc = () => {
  //   window.removeEventListener("keydown", (e) => {
  //     if (e.key === "Escape") {
  //       setModalOpen(false);
  //     }
  //   });
  // };

  // ChangeSelectValue
  const changeSelectValue = (e) => {
    setStatus(e.target.value);
  };

  // handleSubmit
  const hadleSubmit = (e) => {
    e.preventDefault();
    // console.log({ title, status });
    if (title === "") {
      toast.error("Пожалуйста введите заголовок");
      return;
    }
    if (title && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success("Задача успешно добавлена!");
      }
      if (type === "update") {
        if (todo.title !== title || todo.status !== status) {
          dispatch(updateTodo({ ...todo, title, status }));
          toast.success("Задача изменена");
        } else {
          toast.error("Изменения не применены");
          return;
        }
      }
      setModalOpen(false);
    }
  };
  // // HandleEscKeyboard
  // React.useEffect(() => {
  //   modalCloseEsc();
  //   removeEventEsc();
  // }, [modalOpen]);

  React.useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("incomplete");
    }
  }, [type, todo, modalOpen]);
  return (
    <>
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className={styles["wrapper"]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles["container"]}
              initial="hidden"
              animate="vissible"
              variants={dropIn}
              exit="exit"
            >
              <motion.div
                className={styles["closeButton"]}
                onClick={() => setModalOpen(false)}
                onKeyDown={() => setModalOpen(false)}
                tabIndex={0}
                role="button"
                initial={{ top: 40, opacity: 0 }}
                animate={{ top: -10, opacity: 1 }}
                exit={{ top: 40, opacity: 0 }}
              >
                <MdOutlineClose />
              </motion.div>
              <form
                className={styles["modal__form"]}
                onSubmit={(e) => hadleSubmit(e)}
              >
                <h1 className={styles["modalTitle"]}>
                  {type === "update" ? "Update" : "Add"} Todo
                </h1>
                <label htmlFor="title">
                  <span className={styles["modal-label__title"]}>Title</span>
                  <input
                    className={styles["input"]}
                    type="text"
                    // placeholder="Enter task"
                    id="title"
                    value={title}
                    onChange={changeInputValue}
                    maxLength={30}
                  />
                </label>
                <label htmlFor="status">
                  <span className={styles["modal-label__title"]}>Status</span>
                  <select
                    name="status"
                    id="status"
                    className={styles["modal__select"]}
                    value={status}
                    onChange={changeSelectValue}
                  >
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Complete</option>
                  </select>
                </label>
                <div className={styles["modal-buttons"]}>
                  <Button type="submit" variant="primary">
                    {type === "update" ? "Update" : "Add"} Task
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TodoModal;
