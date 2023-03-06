import { scroller } from "react-scroll";

export const scrollTarget = (to, duration = 700) => {
  scroller.scrollTo(to, { smooth: true, duration });
};
