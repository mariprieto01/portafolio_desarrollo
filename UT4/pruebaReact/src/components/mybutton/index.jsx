import React, { useState } from "react";
import classes from "./index.module.css";

function Mybutton({ variant, clickHandler, title }) {

  return (
  <button 
    className={classes[variant]}
    onClick={()=> clickHandler()}>
        {title}
    </button>
  );
}

export default Mybutton;
