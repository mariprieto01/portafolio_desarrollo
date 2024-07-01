import React from "react";
import Deporte from "../../Componentes/Deportes";
import { Link } from "react-router-dom";

const Tablero = ({ deportes, onAgregarNuevoDeporte }) => {
  // Filtrar las deportes por titulo

  const football = deportes.filter(deporte => deporte.title === 'Football');
  const basketball = deportes.filter(deporte => deporte.title === 'Basketball');
  const tennis = deportes.filter(deporte => deporte.title === 'Tennis');
  const boxing = deportes.filter(deporte => deporte.title === 'Boxing');
  const volleyball = deportes.filter(deporte => deporte.title === 'Volleyball');
  const fencing = deportes.filter(deporte => deporte.title === 'Fencing');
  const karate = deportes.filter(deporte => deporte.title === 'Karate');
  const taekwondo = deportes.filter(deporte => deporte.title === 'Taekwondo');

  console.log(deportes);
  return (
    <div className="tablero">
      <h1>Tablero de deportes</h1>
      <div className="deportes-container">
        {/* Pasar las deportes y la función de agregar nueva tarea a cada Deporte */}
        <Deporte titulo="Fútbol" deportes={football} onAgregarNuevoDeporte={onAgregarNuevoDeporte} />
        <Deporte titulo="Basketball" deportes={basketball} onAgregarNuevoDeporte={onAgregarNuevoDeporte} />
        <Deporte titulo="Tennis" deportes={tennis} onAgregarNuevoDeporte={onAgregarNuevoDeporte} />
        <Deporte titulo="Boxeo" deportes={boxing} onAgregarNuevoDeporte={onAgregarNuevoDeporte} />
        <Deporte titulo="Volleyball" deportes={volleyball} onAgregarNuevoDeporte={onAgregarNuevoDeporte} />
        <Deporte titulo="Fencing" deportes={fencing} onAgregarNuevoDeporte={onAgregarNuevoDeporte} />
        <Deporte titulo="Karate" deportes={karate} onAgregarNuevoDeporte={onAgregarNuevoDeporte} />
        <Deporte titulo="Taekwondo" deportes={taekwondo} onAgregarNuevoDeporte={onAgregarNuevoDeporte} />
      </div>
      <Link to="/nuevo-deporte">
        <button>+ Añadir una tarea</button>
      </Link>
    </div>
  );
};

export default Tablero;