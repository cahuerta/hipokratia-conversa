// App.jsx — conoce.hipokratia.health
// conoce.icarticular.cl — el mismo sitio con el video del Instituto de Cirugía Articular (marca.js)
//   /                → la escena: Ica, Ipo, Sophia y Katia conversan
//   /?modo=carrusel  → solo los avatares pasando, para mostrarse dentro de hipokratia.health
import Escena from "./src/Escena.jsx";
import Carrusel from "./src/Carrusel.jsx";
import { MARCA } from "./src/marca.js";

document.body.classList.add(`cv-marca-${MARCA}`);

const modo = new URLSearchParams(window.location.search).get("modo");

export default function App() {
  if (modo === "carrusel") {
    document.body.classList.add("cv-modo-carrusel");
    return <Carrusel />;
  }
  document.body.classList.add("cv-modo-escena");
  return <Escena esperarInicio />;
}
