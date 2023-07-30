import React, { useState } from "react";
import styles from "./styles.module.css";
import { AiOutlineSearch } from "react-icons/ai";

const Header = ({ title, user }) => {
  const [search, setSearch] = useState("");

  return (
    <div className={styles.pageTitle}>
      <div className={styles.titleCon}>
        <div className={styles.title}>{title}</div>
        <div className={styles.greeting}>
          <h3>
            Welcome {user?.firstname} <span>👋</span>
          </h3>
          <p>Good to see you again!</p>
        </div>
      </div>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <AiOutlineSearch />
      </div>
    </div>
  );
};

export default Header;
