import React from "react";
import styles from "../styles/modules/ModalDescription.module.scss";
import { motion } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addDescription } from "../slices/todoSlice";
import { toast } from "react-hot-toast";

const ModalDescription = ({
  description,
  setDescription,
  openDescriptionModal,
  setOpenDescriptionModal,
}) => {
  // const [description, setDescription] = React.useState("");
  const { id } = useParams();
  // console.log(id);

  // dispatch
  const dispatch = useDispatch();

  // Обработчик описания
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  // Обработчик отправки
  const handeSubmit = (e) => {
    e.preventDefault();
    dispatch(addDescription({ id, description }));
    setOpenDescriptionModal(!openDescriptionModal);
  };

  // Добавление описания
  // const addDescription = () => {};

  return (
    <>
      <div className={styles["wrapper"]}>
        <div className={styles["container"]}>
          <motion.div
            className={styles["closeButton"]}
            onClick={() => setOpenDescriptionModal(false)}
            onKeyDown={() => setOpenDescriptionModal(false)}
            tabIndex={0}
            role="button"
            initial={{ top: 40, opacity: 0 }}
            animate={{ top: -10, opacity: 1 }}
            exit={{ top: 40, opacity: 0 }}
          >
            <MdOutlineClose />
          </motion.div>
          <form onSubmit={(e) => handeSubmit(e)}>
            <div className={styles["modal-content"]}>
              <h1 className={styles["modal-title"]}>Добавить описание</h1>
              <textarea
                className={styles["modal-input"]}
                name="description"
                id="description"
                cols="30"
                rows="10"
                placeholder="Введите описание"
                value={description}
                onChange={handleDescription}
              ></textarea>
              <Button type="submit" variant="primary">
                Добавить
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalDescription;
