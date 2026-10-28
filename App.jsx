// App.jsx — conoce.hipokratia.health
//   /                → la escena: Ica, Ipo, Sophia y Katia conversan y presentan HypokratIA
//   /?modo=carrusel  → solo los avatares pasando, para mostrarse dentro de hipokratia.health
import Escena from "./src/Escena.jsx";
import Carrusel from "./src/Carrusel.jsx";

const modo = new URLSearchParams(window.location.search).get("modo");

export default function App() {
  if (modo === "carrusel") {
    document.body.classList.add("cv-modo-carrusel");
    return <Carrusel />;
  }
  document.body.classList.add("cv-modo-escena");
  return <Escena esperarInicio />;
}
