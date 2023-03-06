import React from "react";
//assets
import { ArrowRight } from "../../assets/icons";
//styles
import styles from "./styles.module.scss";

const Case = ({ title, text }) => {
  return (
    <div className={styles.case}>
      {title && (
        <div className={styles.case__title}>
          <ArrowRight />
          {title}
        </div>
      )}
      <p>{text}</p>
    </div>
  );
};

export default Case;
