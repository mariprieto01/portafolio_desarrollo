import React, { useState, useEffect } from "react";
import MiBoton from "../../Componentes/Boton";
import Tarea from "../../Componentes/Tareas";
import { useParams, useNavigate } from "react-router-dom";

const Detalles = ({ tareas, actualizarTarea, eliminarTarea, isEditing = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tarea, setTarea] = useState(null);
  const [editando, setEditando] = useState(isEditing);

  useEffect(() => {
    if (id) {
      const tareaEncontrada = tareas.find((t) => t.id === id);
      setTarea(tareaEncontrada);
    }
  }, [id, tareas]);

  useEffect(() => {
    if (id && !isEditing) {
      const tareaEncontrada = tareas.find((t) => t.id === id);
      setTarea(tareaEncontrada);
    }
  }, [id, isEditing, tareas]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarea({ ...tarea, [name]: value });
  };

  const cambiosTarea = () => {
    actualizarTarea(tarea);
    navigate(`/detalles/${id}`);
    setEditando(false);
  };

  const eliminarTareaActual = () => {
    eliminarTarea(id);
    navigate("/");
  };

  return (
    <div className="detalleTarea">
      {tarea ? (
        editando ? (
          <form>
            <input
              name="title"
              value={tarea.title}
              onChange={handleChange}
              placeholder="Título"
            />
            <input
              name="description"
              value={tarea.description}
              onChange={handleChange}
              placeholder="Descripción"
            />
            <input
              name="assignedTo"
              value={tarea.assignedTo}
              onChange={handleChange}
              placeholder="Asignado a"
            />
            <input
                name="startDate"
                value={tarea.startDate}
                onChange={handleChange}
                placeholder="Fecha de inicio"
            />
            <input
                name="endDate"
                value={tarea.endDate}
                onChange={handleChange}
                placeholder="Fecha de finalización"
            />
            <input
                name="status"
                value={tarea.status}
                onChange={handleChange}
                placeholder="Estado"    
            />
            <input
                name="priority"
                value={tarea.priority}
                onChange={handleChange}
                placeholder="Prioridad"
            />
            <input
                name="comments"
                value={tarea.comments}
                onChange={handleChange}
                placeholder="Comentarios"
            />
            <MiBoton onClick={cambiosTarea} titulo="Guardar" />
          </form>
        ) : (
          <>
            <Tarea tarea={tarea} />
            <MiBoton onClick={() => setEditando(true)} titulo="Editar" />
            <MiBoton onClick={eliminarTareaActual} titulo="Eliminar" />
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
