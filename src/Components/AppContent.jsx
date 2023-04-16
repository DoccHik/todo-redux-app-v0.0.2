import React from "react";
import styles from "../styles/modules/AppContent.module.scss";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const container = {
  hidden: { opacity: 1 },
  vissible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } },
};

const child = {
  hidden: { y: 20, opacity: 0 },
  vissible: {
    y: 0,
    opacity: 1,
  },
};

const AppContent = () => {
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const todoList = useSelector((state) => state.todo.todoList);
  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));
  // console.log(todoList);

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    return item.status === filterStatus;
  });
  return (
    <>
      <motion.div
        className={styles["app-content"]}
        variants={container}
        initial="hidden"
        animate="vissible"
      >
        <AnimatePresence>
          {filteredTodoList && filteredTodoList.length > 0 ? (
            filteredTodoList.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))
          ) : (
            <motion.h1
              className={styles["app-content__no-todos"]}
              variants={child}
              // initial="hidden"
              // animate="vissible"
            >
              No Todo Found
            </motion.h1>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default AppContent;
