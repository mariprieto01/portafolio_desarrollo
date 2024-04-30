import Mybutton from "./components/mybutton";
import { useState } from "react";
import classes from "./App.module.css";

export default function App() {
  const [contador, setContador] = useState(0);

  const sumar = () => {
    setContador(contador + 1);
  };
useState
  const restar = () => {
    setContador(contador - 1);
  };

  const reiniciar = () => {
    setContador(0);
  };

  return (
    <div id="root">
      <div className="Contenido">
      <h1>Contador: {contador}</h1>
      <div className={classes.botonesWrapper}>
      <Mybutton title={"Suma"} variant={"botonSuma"} clickHandler={sumar}/>
      <Mybutton title={"Resta"} variant={"botonResta"} clickHandler={restar}/>
      <Mybutton title={"Reiniciar"} variant={"botonReiniciar"} clickHandler={reiniciar}/>
      </div>
    </div>
    </div>
  );
}