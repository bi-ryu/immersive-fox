import React from "react";
//styles
import styles from "./styles.module.scss";

const JonInfo = ({ title, text }) => {
  return (
    <div
      className={styles.value}
      data-aos={window.innerWidth > 1150 ? "zoom-out-down" : "fade-up"}
    >
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default JonInfo;
