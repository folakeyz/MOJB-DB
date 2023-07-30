import { lazy } from "react";
import { BasePaths } from "./path";

const BaseRoutes = [
  {
    path: "/*",
    exact: true,
    component: lazy(() => import("./AuthRouter")),
    useAuth: false,
  },
  {
    path: `${BasePaths.MAIN}/*`,
    exact: true,
    component: lazy(() => import("./AdminRouter")),
    useAuth: true,
  },

  {
    path: "*",
    exact: false,
    component: lazy(() => import("../modules/NotFound")),
    useAuth: false,
  },
];

export default BaseRoutes;
