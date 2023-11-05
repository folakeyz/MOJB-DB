import React from "react";
import styles from "./styles.module.css";
import logo from "../../assets/cac.png";
import HRLinks from "./HRLinks";

const Navigation = ({ name, role }) => {
  return (
    <div className={styles.navigation}>
      <div className={styles.userContainer}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" />
        </div>
      </div>
      <HRLinks name={name} roles={role} />
    </div>
  );
};

export default Navigation;
