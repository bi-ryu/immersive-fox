import React from "react";
//styles
import styles from "./styles.module.scss";

const Step = ({ title, text, Icon, index }) => {
  return (
    <div
      className={styles.step}
      data-aos="fade-right"
      data-aos-delay={`${(index + 1) * 80}`}
      data-aos-duration="500"
      data-aos-easing="linear"
    >
      <div className={styles.step__photo}>
        <Icon />
      </div>
      <div className={styles.step__content}>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Step;
