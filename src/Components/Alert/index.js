import React, { useContext } from "react";
import { WebContext } from "../../Context/WebContext";
import "./style.css";

const Alert = () => {
  const { alert } = useContext(WebContext);
  return (
    alert.show && (
      <div className={"alert alert-" + alert.type}>{alert.message}</div>
    )
  );
};

export default Alert;
