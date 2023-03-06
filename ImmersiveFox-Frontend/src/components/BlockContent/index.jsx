import React from "react";
//components
import { Button, Label } from "../../components";
//styles
import styles from "./styles.module.scss";

const BlockContent = ({ title, text, btnTitle, label, onClick, showBtn=true }) => {
  return (
    <div className={styles.content}>
      <Label label={label} />
      <h2>{title}</h2>
      <p>{text}</p>
        {
          showBtn ? <Button title={btnTitle} onClick={onClick} emptyWhite /> : null
        }
    </div>
  );
};

export default BlockContent;
