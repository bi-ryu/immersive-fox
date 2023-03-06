import React, { useState, useRef } from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
//nav
import CasesNavigation from "../../../navigation/blocks/CasesNavigation";
//hooks
import { useCurrentLocation, useOutsideClick } from "../../../hooks";
//assets
import { DownArrow } from "../../../assets/icons";
//styles
import styles from "./styles.module.scss";

const Cases = () => {
  const selectorRef = useRef(null);
  const location = useCurrentLocation();
  const [showSelector, setShowSelector] = useState(false);

  const closeSelector = () => {
    setShowSelector(false);
  };

  const toggleSelector = () => {
    setShowSelector(!showSelector);
  };

  useOutsideClick(selectorRef, closeSelector);

  const caseTabs = [
    { title: "Sales Enablement",to: "/useCases/salesEnablement"},
    { title: "Customer Communications", to: "/useCases/customerCommunications" },
    { title: "Learning & Development", to: "/useCases/learningDevelopment" },
    { title: "Corporate communications", to: "/useCases/corporateCommunications" },
  ];
  const selectorTitle = {
    "/useCases/salesEnablement": "Sales Enablement",
    "/useCases/customerCommunications": "Customer Communication",
    "/useCases/learningDevelopment": "Learning & Development",
    "/useCases/corporateCommunications": "Corporate communications",
  };

  return (
    <div className={styles.cases}>
      <div className={styles.cases__header}>
        {caseTabs.map((item, index) => (
          <NavLink
            to={item.to}
            className={styles.cases__headeItem}
            activeClassName={styles.active}
            key={index}
          >
            {item.title}
          </NavLink>
        ))}
      </div>
      <div className={styles.cases__selector} ref={selectorRef}>
        <div
          className={clsx(styles.cases__selectorTitle, {
            [styles.active]: showSelector,
          })}
          onClick={toggleSelector}
        >
          {selectorTitle[location]}
          <DownArrow />
        </div>
        <div
          className={clsx(styles.cases__selectorList, {
            [styles.active]: showSelector,
          })}
        >
          {caseTabs.map((item, index) => (
            <NavLink
              to={item.to}
              onClick={closeSelector}
              activeClassName={styles.active}
              key={index}
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>
      <div className={styles.cases__content}>
        <div className="container">
          <CasesNavigation />
        </div>
      </div>
    </div>
  );
};

export default Cases;
