import React from "react";
import { InfinitySpin } from "react-loader-spinner";
import styles from "./styles.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <InfinitySpin width="200" color="#28a745" />
      <p>Loading....</p>
    </div>
  );
};

export default Loader;
