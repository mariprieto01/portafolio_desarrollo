import React from "react";

const TituloTarea = ({ titulo }) => {
  return (
    <div className="tarjeta">
      <div className="tarjetaHeader">
        <h3>{titulo}</h3>
      </div>
    </div>
  );
};

export default TituloTarea;
