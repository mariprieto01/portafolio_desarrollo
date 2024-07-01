import React from "react";
import { Link } from "react-router-dom";

const Tarjeta = ({titulo, deportes, onMostrarDeporte}) => {
    return (
        <div className="tarjeta">
            <h3>{titulo}</h3>
            {deportes.map((deporte) => (
                <div key={deporte.id}> 
                    <div>{deporte.title}</div>
                    <Link to={`/detalles/${deporte.id}`} onClick={() => onMostrarDeporte(deporte.id)}>Detalles</Link>
                </div>
            ))}
        </div>
    )
}

export default Tarjeta;
