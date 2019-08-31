import React, { useState, useEffect } from "react";
import styles from "./hello-api.module.css";

const HelloApi = () => {
  const [msg, setMsg] = useState("-");
  useEffect(() => {
    fetch("api/hello")
      .then(response => response.text())
      .then(text => setMsg(text));
  });
  return <div className={styles.container}>{msg}</div>;
};

export default HelloApi;
