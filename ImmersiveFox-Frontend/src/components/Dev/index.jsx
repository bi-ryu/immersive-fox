import React from "react";
//styles
import styles from "./styles.module.scss";

const Dev = ({ children, name, position, text, avatar, index }) => {
  return (
    <div
      className={styles.dev}
      data-aos="zoom-out-up"
      data-aos-duration={300 * (index + 1)}
    >
      <div className={styles.dev__photo}>
        <img src={avatar} alt="avatar" />
      </div>
      <h3>{name}</h3>
      <h5>{position}</h5>
      <p>{text}</p>
      {children}
    </div>
  );
};

export default Dev;
