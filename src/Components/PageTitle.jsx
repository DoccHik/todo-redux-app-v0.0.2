import React from "react";
import styles from "../styles/modules/PageTitle.module.scss";

const PageTitle = ({ children }) => {
  return (
    <>
      <h1 className={styles["pageTitle"]}>{children}</h1>
    </>
  );
};

export default PageTitle;
