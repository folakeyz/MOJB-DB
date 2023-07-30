import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { Header, Navigation } from "../components";
import { AuthContext } from "../context";

const PrivateLayout = ({ children, name, role = "Admin", pageTitle }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="appContainer">
      <Navigation name={name} role={role} />
      <div className="contentsRight">
        <ToastContainer />
        <div className="contents">
          <Header title={pageTitle} user={user} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
