import { UseCases, Home, Jobs, NotFound } from "../pages";

export const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/jobs",
    exact: true,
    component: Jobs,
  },
  {
    path: "/useCases",
    exact: false,
    component: UseCases,
  },
  {
    path: "*",
    exact: true,
    component: NotFound,
  },
];
