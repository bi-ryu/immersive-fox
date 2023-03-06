import React, { useState, useRef } from "react";
import { animateScroll } from "react-scroll";
//config
import { EMAIL } from "../../config";
//styles
import styles from "./styles.module.scss";

const Job = ({ index, titleJob, location, list }) => {
  const jobRef = useRef(null);
  const offsetTop = jobRef.current?.offsetTop;
  const points = Object.keys(list).length;
  const [count, setCount] = useState(1);

  const toggleJob = () => {
    if (points === count) {
      animateScroll.scrollTo(offsetTop - 20, { duration: 800 });
      setCount(1);
      return;
    }
    setCount(points);
  };
  const openEmail = () => {
    window.location.href = `mailto:${EMAIL}`;
  };

  return (
    <div
      className={styles.job}
      ref={jobRef}
      data-aos={`fade-${index % 2 === 0 ? "right" : "left"}`}
      data-aos-offset="200"
      data-aos-duration="1000"
    >
      <div className={styles.job__header}>
        <h2>{titleJob}</h2>
        <h5>{location}</h5>
      </div>
      <div className={styles.job__wrapper}>
        <div>
          {Object.keys(list)
            .slice(0, count)
            .map((title, index) => (
              <div className={styles.job__info} key={index}>
                <h4>{title}:</h4>
                {list[title].map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            ))}
        </div>
        {points === count && (
          <div className={styles.job__cvBtn} onClick={openEmail}>
            <h5>To apply send your CV to </h5>
            <h3>contact@immersive-fox.com</h3>
          </div>
        )}
        <div className={styles.job__btn}>
          <button onClick={toggleJob}>
            {points === count ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Job;
