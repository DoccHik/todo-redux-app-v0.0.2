import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

import styles from "../styles/modules/TodoItem.module.scss";

const checkVariants = {
  intial: {
    color: "#fff",
  },
  checked: {
    pathLength: 1,
  },
  unchecked: {
    pathLength: 0,
  },
};

const boxVariant = {
  checked: {
    background: "#646ff0",
    transition: { duration: 0.1 },
  },
  unchecked: {
    background: "#eee",
    transition: { duration: 0.1 },
  },
};

const CheckButton = ({ checked, handleCheck }) => {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);
  return (
    <>
      <motion.div
        className={styles["svg-box"]}
        variants={boxVariant}
        animate={checked ? "checked" : "unchecked"}
        onClick={handleCheck}
      >
        <motion.svg
          className={styles["svg-icon"]}
          viewBox="0 0 53 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            fill="none"
            animate={checked ? "checked" : "unchecked"}
            style={{ pathLength, opacity }}
            variants={checkVariants}
            strokeMiterlimit="10"
            strokeWidth="6"
            d="M1.5 22L16 36.5L51.5 1"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </motion.svg>
      </motion.div>
    </>
  );
};

export default CheckButton;
