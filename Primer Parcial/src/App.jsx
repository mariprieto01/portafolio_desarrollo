import React, { useState, useEffect } from "react";
import Tablero from "./Paginas/Tablero/Tablero";
import Detalles from "./Paginas/DetallesDeporte/Detalles";
import NuevoDeporte from "./Paginas/NuevoDeporte/NuevoDeporte";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const [deportes, setDeportes] = useState([]);

  useEffect(() => {
    cargarDeportes();
  }, []);

  const cargarDeportes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/games");
      if (response.ok) {
        const data = await response.json();
        setDeportes(data);
      } else {
        console.error("Error al cargar deportes");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  const agregarNuevoDeporte = async (nuevoDeporte) => {
    try {
      const response = await fetch("http://localhost:3000/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoDeporte),
      });
      if (response.ok) {
        console.log("Deporte agregado exitosamente");
        const data = await response.json();
        setDeportes([...deportes, data]);
      } else {
        console.error("Error al agregar deporte");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  const actualizarDeporte = async (deporteActualizado) => {
    try {
      const response = await fetch(`http://localhost:3000/api/games/${deporteActualizado.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deporteActualizado),
      });
      if (response.ok) {
        console.log("Deporte actualizado exitosamente");
        const data = await response.json();
        const deportesActualizados = deportes.map((d) =>
          d.id === data.id ? data : d
        );
        setDeportes(deportesActualizados);
      } else {
        console.error("Error al actualizar deporte");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  const eliminarDeporte = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/games/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Deporte eliminado exitosamente");
        const nuevosDeportes = deportes.filter((deporte) => deporte.id !== id);
        setDeportes(nuevosDeportes);
      } else {
        console.error("Error al eliminar deporte");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Tablero deportes={deportes} />}
        />
        <Route
          path="/detalles/:id"
          element={<Detalles deportes={deportes} actualizarDeporte={actualizarDeporte} eliminarDeporte={eliminarDeporte} />}
        />
        <Route
          path="/editar/:id"
          element={<Detalles deportes={deportes} actualizarDeporte={actualizarDeporte} eliminarDeporte={eliminarDeporte} isEditing={true} />}
        />

        <Route
          path="/nuevo-deporte"
          element={<NuevoDeporte onAgregarNuevoDeporte={agregarNuevoDeporte} />}
        />
      </Routes>
    </BrowserRouter>
  );
}