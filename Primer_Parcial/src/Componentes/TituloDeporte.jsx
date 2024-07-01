import React from "react";

const TituloDeporte = ({ titulo }) => {
  return (
    <div className="tarjeta">
      <div className="tarjetaHeader">
        <h3>{titulo}</h3>
      </div>
    </div>
  );
};

export default TituloDeporte;
