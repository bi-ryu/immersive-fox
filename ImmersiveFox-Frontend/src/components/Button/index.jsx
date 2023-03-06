import React from "react";
import clsx from "clsx";
//assets
import { DoubleArrow } from "../../assets/icons";
//styles
import styles from "./styles.module.scss";

const Button = ({
  onClick,
  title,
  Icon = DoubleArrow,
  fullOrange = false,
  fullDark = false,
  emptyDark = false,
}) => {
  return (
    <button
      className={clsx(styles.button, {
        [styles.fullOrange]: fullOrange,
        [styles.fullDark]: fullDark,
        [styles.emptyDark]: emptyDark,
      })}
      onClick={onClick}
    >
      <div className={styles.button__title}>{title}</div>
      <div className={styles.button__icon}>
        <Icon />
      </div>
    </button>
  );
};

export default Button;
