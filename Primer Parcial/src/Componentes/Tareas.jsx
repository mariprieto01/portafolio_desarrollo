import React from "react";

const Tarea = ({ tarea }) => {
  return (
    <div className="tareasContainer">
      <p>{tarea.id}</p>
      <p>{tarea.title}</p>
      <p>{tarea.description}</p>
      <p>{tarea.assignedTo}</p>
      <p>{tarea.startDate}</p>
      <p>{tarea.endDate}</p>
      <p>{tarea.status}</p>
      <p>{tarea.priority}</p>
      <p>{tarea.comments}</p>
    </div>
  );
};

export default Tarea;
