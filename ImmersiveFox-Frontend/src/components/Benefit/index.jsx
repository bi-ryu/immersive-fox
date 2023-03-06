import React from "react";
import clsx from "clsx";
///styles
import styles from "./styles.module.scss";

const Benefit = ({ title, text, index, Icon, absolute = false }) => {
  return (
    <div
      className={clsx(styles.benefit, styles[`${index + 1}`], {
        [styles.absolute]: absolute,
      })}
      data-aos="flip-down"
      data-aos-offset={window.innerWidth > 1000 ? "200" : "0"}
      data-aos-delay={`${index + 2}00`}
    >
      <Icon />
      <h3>
        <span>{title}</span> - {text}
      </h3>
    </div>
  );
};

export default Benefit;
