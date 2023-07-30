import { Navigate, useLocation } from "react-router-dom";

import { PublicPaths } from "../routes/path";
import React from "react";
import { isAuthenticated } from "../utils";

const AuthGuard = ({ children }) => {
  const location = useLocation();

  if (isAuthenticated()) {
    return <>{children}</>;
  }
  return <Navigate to={PublicPaths.LOGIN} state={{ from: location }} replace />;
};

export default AuthGuard;
