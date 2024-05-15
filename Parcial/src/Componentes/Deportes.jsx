import React from "react";

const Deporte = ({ deporte }) => {
  if (!deporte) {
    return <div>No hay datos de deporte</div>;
  }

  return (
    <div className="deportesContainer">
      <p>{deporte.id}</p>
      <p>{deporte.title}</p>
      <p>{deporte.description}</p>
      <p>{deporte.players}</p>
      <p>{deporte.categories}</p>
    </div>
  );
};

export default Deporte;

