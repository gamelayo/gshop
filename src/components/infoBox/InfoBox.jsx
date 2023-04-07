import React from "react";
import Card from "../card/Card";
import styles from "./InfoBox.module.scss";
const InfoBox = ({ cardClass, title, count, icon }) => {
  return (
    <div className={styles["info-box"]}>
      <Card cardClass={cardClass}>
        <h4>{title}</h4>
        <div className={styles.span}>
          <h3>{count}</h3>
          {icon}
        </div>
      </Card>
    </div>
  );
};

export default InfoBox;
