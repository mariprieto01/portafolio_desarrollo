import React, { useState, useEffect } from "react";
import MiBoton from "../../Componentes/Boton";
import Deporte from "../../Componentes/Deportes";
import { useParams, useNavigate } from "react-router-dom";

const Detalles = ({ deportes, actualizarDeporte, eliminarDeporte, isEditing = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deporte, setDeporte] = useState(null);
  const [editando, setEditando] = useState(isEditing);

  useEffect(() => {
    if (id) {
      const deporteEncontrado = deportes.find((d) => d.id === id);
      setDeporte(deporteEncontrado);
    }
  }, [id, deportes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeporte({ ...deporte, [name]: value });
  };

  const cambiosDeporte = () => {
    actualizarDeporte(deporte);
    navigate(`/detalles/${id}`);
    setEditando(false);
  };

  const eliminarDeporteActual = () => {
    eliminarDeporte(id);
    navigate("/");
  };

  return (
    <div className="detalleDeporte">
      {deporte ? (
        editando ? (
          <form>
            <input
              name="title"
              value={deporte.title}
              onChange={handleChange}
              placeholder="Título"
            />
            <input
              name="description"
              value={deporte.description}
              onChange={handleChange}
              placeholder="Descripción"
            />
            <input
              name="players"
              value={deporte.players}
              onChange={handleChange}
              placeholder="Jugadores"
            />
            <input
                name="categories"
                value={deporte.categories}
                onChange={handleChange}
                placeholder="Categoría"
            />
            <MiBoton onClick={cambiosDeporte} titulo="Guardar" />
          </form>
        ) : (
          <>
            <Deporte deporte={deporte} />
            <MiBoton onClick={() => setEditando(true)} titulo="Editar" />
            <MiBoton onClick={eliminarDeporteActual} titulo="Eliminar" />
          </>
        )
      ) : (
        <p>Cargando...</p>
      )}
      <MiBoton onClick={() => navigate("/")} titulo="Cancelar" />
    </div>
  );
};

export default Detalles;