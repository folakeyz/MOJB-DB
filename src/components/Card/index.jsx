import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const Card = ({ Icon, title, count, url = "", color, colorInner }) => {
  return (
    <Link className={`${styles.card} ${styles[color]}`} to={url}>
      <div className={styles.text}>
        <p>{title}</p>
        <h1> {count}</h1>
      </div>

      <div className={`${styles.circle}`}>
        <div>{<Icon />}</div>
      </div>
    </Link>
  );
};

export default Card;
