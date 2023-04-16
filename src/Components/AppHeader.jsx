import React from "react";
import styles from "../styles/modules/AppHeader.module.scss";
import Button, { SelectButton } from "./Button";
import TodoModal from "./TodoModal";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../slices/todoSlice";

const AppHeader = () => {
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = React.useState(false);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const updatrFilter = (e) => {
    // console.log(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };
  return (
    <>
      <div className={styles["header"]}>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Add Task
        </Button>
        <SelectButton value={filterStatus} onChange={updatrFilter}>
          <option value="all">All</option>
          <option value="incomplete">Incomplate</option>
          <option value="complete">Complete</option>
        </SelectButton>
        <TodoModal
          type="add"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </div>
    </>
  );
};

export default AppHeader;
