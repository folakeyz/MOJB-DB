import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import image from "../../assets/avatar.png";
const ActivityList = ({ url, name }) => {
  return (
    <Link to={url} className={styles.activity}>
      <div className={styles.image}>
        <img src={image} alt="videoicon" />
      </div>
      <div className={styles.textx}>{name}</div>
    </Link>
  );
};

export default ActivityList;
