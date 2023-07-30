import { Fragment, lazy, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PublicPaths } from "./path";
import SpecificLoader from "../utils/SpecificLoader";
import { UserRoles } from "../utils/constants";
import { AuthContext } from "../context";

const privateRoutes = [
  /* Add paths for authorized users */
  {
    path: "dashboard",
    element: lazy(() => import("../modules/Admin/Dashboard")),
    //   element: SpecificLoader({
    //     [UserRoles.ADMIN]: lazy(() =>
    //       import("../modules/Administrator/SuperAdmin/Dashboard")
    //     ),
    //     [UserRoles.HR]: lazy(() =>
    //       import("../modules/Administrator/SuperAdmin/Dashboard")
    //     ),
    //     [UserRoles.STAFF]: lazy(() =>
    //       import("../modules/Administrator/SuperAdmin/Dashboard")
    //     ),
    //     [UserRoles.MANAGER]: lazy(() =>
    //       import("../modules/Administrator/SuperAdmin/Dashboard")
    //     ),
    //     [UserRoles.TEAM_LEAD]: lazy(() =>
    //       import("../modules/Administrator/SuperAdmin/Dashboard")
    //     ),
    //   }),
  },
  {
    path: "youth",
    element: lazy(() => import("../modules/Admin/Youth")),
  },
  {
    path: "members",
    element: lazy(() => import("../modules/Admin/Members")),
  },
  {
    path: "members/bulk",
    element: lazy(() => import("../modules/Admin/Members/Bulk")),
  },
];

function Admin() {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to={`${PublicPaths.LOGIN}`} replace />;
  }
  return (
    <Routes>
      {privateRoutes.map(({ path, element: Element }) => (
        <Fragment key={path}>
          <Route key={path} path={path} element={<Element />} />
        </Fragment>
      ))}
    </Routes>
  );
}

export default Admin;
