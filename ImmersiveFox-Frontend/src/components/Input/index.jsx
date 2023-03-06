import React from "react";
import clsx from "clsx";
//styles
import styles from "./styles.module.scss";

const Input = ({ placeholder, value, onChange, name, error = false }) => {
  return (
    <div className={clsx(styles.input, { [styles.error]: error })}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
      />
      <div className={styles.input__error}>{error}</div>
    </div>
  );
};

export default Input;
