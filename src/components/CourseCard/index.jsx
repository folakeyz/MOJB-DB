import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { BiCheckCircle, BiEdit } from "react-icons/bi";
const CourseCard = ({ status, image, title, total, sections, url }) => {
  return (
    <Link to={url} className={styles.card}>
      <div className={styles.status}>
        <p
          className={`${styles.capsule} ${
            status === "Draft" ? styles.pending : styles.success
          }`}
        >
          {status === "Draft" ? <BiEdit /> : <BiCheckCircle />} {status}
        </p>
      </div>
      <div className={styles.image}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.text}>
        <div className={styles.title}>{title}</div>
        <div className={styles.rating}>
          <div className={styles.first}>
            <p>Total Number of Learners</p>
            <h5>{total}</h5>
          </div>
          <div className={styles.second}>
            <p>Course Sections</p>
            <h5>{sections}</h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
