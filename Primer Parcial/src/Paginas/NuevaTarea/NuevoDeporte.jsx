import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NuevoDeporte = ({ onAgregarNuevaTarea }) => {
  const [tarea, setTarea] = useState({
    id: '',
    title: '',
    description: '',
    assignedTo: '',
    startDate: '',
    endDate: '',
    status: '',
    priority: '',
    comments: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarea({
      ...tarea,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarea),
      });
      if (response.ok) {
        console.log('Tarea agregada exitosamente');
        // Llamar a la función para agregar la nueva tarea al estado
        onAgregarNuevaTarea(tarea);
        // Redirigir a la página principal
        navigate('/');
      } else {
        console.error('Error al agregar tarea');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div className="nuevaTarea">
      <h2>Agregar Nuevo Deporte</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={tarea.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={tarea.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="assignedTo">Jugadores:</label>
          <input
            type="text"
            id="assignedTo"
            name="assignedTo"
            value={tarea.assignedTo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="startDate">Categoría:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={tarea.startDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default NuevoDeporte;