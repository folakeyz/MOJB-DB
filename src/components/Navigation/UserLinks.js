import React from "react";
import { Link } from "react-router-dom";
import { AiFillAppstore } from "react-icons/ai";
import styles from "./styles.module.css";
import { BsReplyAllFill } from "react-icons/bs";

const UserLinks = ({ dashboard, logout }) => {
  return (
    <div className={styles.links}>
      <ul>
        <li className={styles[dashboard]}>
          <Link to={`/app/dashboard`}>
            <AiFillAppstore />
            Dashboard
          </Link>
        </li>

        <li>
          <Link to={`/#logout`} onClick={logout}>
            <BsReplyAllFill />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserLinks;
