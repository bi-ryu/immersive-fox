import React from "react";
import clsx from "clsx";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import { scrollTarget } from "../../../helpers";
//assets
import { LinkedLn, Logo, Twitter } from "../../../assets/icons";
import { Label } from "../../../components";
//styles
import styles from "./styles.module.scss";

const Footer = () => {
  const history = useHistory();
  const location = useLocation();
  const scrollNavs = [
    {
      title: "About Us",
      to: "aboutUs",
    },
    {
      title: "How it Works",
      to: "howItWorks",
    },
    {
      title: "Our Clients",
      to: "ourClients",
    },
    {
      title: "Team",
      to: "team",
    },
  ];

  const routeTo = async (to) => {
    if (location.pathname !== "/") await history.push("/");
    scrollTarget(to);
  };
  const scrollUp = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.footer}>
      <div className="container">
        <div className={styles.footer__box}>
          <div className={styles.footer__left}>
            <Link className={styles.footer__logo} to="/">
              <Logo />
            </Link>
            <div className={styles.footer__social}>
              <a
                href="https://twitter.com/immersive_fox"
                target="_blank"
                rel="noreferrer"
              >
                <Twitter />
              </a>
              <a
                href="https://www.linkedin.com/company/immersive-fox"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedLn />
              </a>
            </div>
            <div className={styles.footer__copy}>
              © 2019. All rights reserved.
            </div>
          </div>
          <div className={styles.footer__menu}>
            <div className={styles.footer__menuItem}>
              {scrollNavs.slice(0, 3).map((item) => (
                <LinkScroll
                  to={item.to}
                  smooth={true}
                  onClick={() => routeTo(item.to)}
                  key={item.to}
                >
                  {item.title}
                </LinkScroll>
              ))}
            </div>
            <div className={styles.footer__menuItem}>
              {scrollNavs.slice(3, 4).map((item) => (
                <LinkScroll
                  to={item.to}
                  smooth={true}
                  onClick={() => routeTo(item.to)}
                  key={item.to}
                >
                  {item.title}
                </LinkScroll>
              ))}
              <Link to="/useCases" onClick={scrollUp}>
                Use Cases
              </Link>
              <Link to="/jobs">Jobs</Link>
            </div>
          </div>
          <div className={styles.footer__right}>
            <Label label="contact@immersive-fox.com" />
            <Label label="+44 7860 820 959" />
          </div>
        </div>
        <div className={clsx(styles.footer__copy, styles.mobile)}>
          © 2019. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
