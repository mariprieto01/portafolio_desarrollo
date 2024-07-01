import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NuevoDeporte = ({ onAgregarNuevoDeporte }) => {
  const [deporte, setDeporte] = useState({
    id: '',
    title: '',
    description: '',
    players: '',
    categories: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeporte({
      ...deporte,
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
        body: JSON.stringify(deporte),
      });
      if (response.ok) {
        console.log('Deporte agregado exitosamente');
        // Llamar a la función para agregar la nueva tarea al estado
        onAgregarNuevoDeporte(deporte);
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
    <div className="nuevoDeporte">
      <h2>Agregar Nuevo Deporte</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={deporte.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={deporte.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="players">Jugadores:</label>
          <input
            type="text"
            id="players"
            name="players"
            value={deporte.players}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="categories">Categoría:</label>
          <input
            type="text"
            id="categories"
            name="categories"
            value={deporte.categories}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default NuevoDeporte;