import React, {useState} from "react";
import { createPortal } from "react-dom";
import { NavLink, Link, useHistory, useLocation } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import clsx from "clsx";
//helpers
import { scrollTarget } from "../../../helpers";
//assets
import { Burger, Close, Logo } from "../../../assets/icons";
//style
import styles from "./styles.module.scss";
import {accessTokenKey} from "../../../utils/constants";

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const [menu, setMenu] = useState(false);
  const isUserLoggedIn = localStorage.getItem(accessTokenKey);
  if (isUserLoggedIn) {
    history.push('/avatar')
  }

  const openMenu = () => {
    setMenu(true);
    document.querySelector("#root").classList.add("blurMain");
    document.body.style.overflowY = "hidden";
  };
  const closeMenu = () => {
    setMenu(false);
    document.querySelector("#root").classList.remove("blurMain");
    document.body.style.overflowY = "auto";
  };

  const scrollNavs = [
    {
      title: "About Us",
      to: "aboutUs",
    },
    {
      title: "Our Clients",
      to: "ourClients",
    },
    {
      title: "How it Works",
      to: "howItWorks",
    },
    {
      title: "Team",
      to: "team",
    },
  ];

  const routeTo = async (to) => {
    if (location.pathname !== "/") await history.push("/");
    scrollTarget(to);
    closeMenu();
  };

  return (
    <>
      <div className={styles.header}>
        <div className="container__big">
          <div className={styles.header__box}>
            <Link to="/" className={styles.header__logo}>
              <Logo />
            </Link>
            <div className={clsx(styles.header__menu, styles.center)}>
              {scrollNavs.map((item) => (
                <LinkScroll
                  to={item.to}
                  smooth={true}
                  key={item.to}
                  onClick={() => routeTo(item.to)}
                >
                  {item.title}
                </LinkScroll>
              ))}
              <NavLink to="/useCases" activeClassName={styles.active}>
                Use Cases
              </NavLink>
              <NavLink to="/jobs" activeClassName={styles.active}>
                Jobs
              </NavLink>
              <LinkScroll
                className={styles.connect}
                to="connectWithUs"
                smooth={true}
              >
                Connect with Us
              </LinkScroll>
            </div>
            <div className={styles.header__menu}>
              <NavLink style={{fontWeight: 700}} to="/login" activeClassName={styles.active}>
                Sign In
              </NavLink>
              <NavLink style={{fontWeight: 700}} to="/signup" activeClassName={styles.active}>
               Sign Up
              </NavLink>
            </div>
            <div className={styles.header__burger} onClick={openMenu}>
              <Burger />
            </div>
          </div>
        </div>
      </div>
      <>
        <div
          className={clsx(styles.header__mobileOverlay, {
            [styles.active]: menu,
          })}
          onClick={closeMenu}
        >
          {createPortal(
            <div
              className={clsx(styles.header__mobileClose, {
                [styles.hide]: !menu,
              })}
              onClick={closeMenu}
            >
              <Close />
            </div>,
            document.body
          )}
        </div>
        {createPortal(
          <div
            className={clsx(styles.header__mobileInner, {
              [styles.active]: menu,
            })}
          >
            <div>
              <div className={styles.header__mobileLogo}>
                <Link to="/">
                  <Logo />
                </Link>
              </div>
              <div className={clsx(styles.header__menu, styles.mobileMenu)}>
                {scrollNavs.map((item) => (
                  <LinkScroll
                    to={item.to}
                    smooth={true}
                    key={item.to}
                    onClick={() => routeTo(item.to)}
                  >
                    {item.title}
                  </LinkScroll>
                ))}
                <NavLink
                  to="/useCases"
                  onClick={closeMenu}
                  activeClassName={styles.active}
                >
                  Use Cases
                </NavLink>
              </div>
            </div>
            <div className={clsx(styles.header__menu, styles.mobileMenu)}>
              <NavLink
                to="/jobs"
                onClick={closeMenu}
                activeClassName={styles.active}
              >
                Jobs
              </NavLink>
              <LinkScroll
                className={styles.connect}
                to="connectWithUs"
                smooth={true}
                onClick={() => routeTo("connectWithUs")}
              >
                Connect with Us
              </LinkScroll>
            </div>
          </div>,
          document.body
        )}
      </>
    </>
  );
};

export default Header;
