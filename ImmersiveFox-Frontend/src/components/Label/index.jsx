import React from "react";
//styles
import styles from "./styles.module.scss";

const Label = ({ label, lineColor = "#FE6338" }) => {
  return (
    <div className={styles.label}>
      <label style={{ color: lineColor }}>/ </label>
      {label}
    </div>
  );
};

export default Label;
