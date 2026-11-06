// App.jsx — conoce.hipokratia.health
// conoce.icarticular.cl — el mismo sitio con el video del Instituto de Cirugía Articular (marca.js)
//   /                → la escena: Ica, Ipo, Sophia y Katia conversan
//   /?modo=carrusel  → solo los avatares pasando, para mostrarse dentro de hipokratia.health
// planes.hipokratia.health — planes y precios de Gestión con el video de los avatares (src/planes)
//   /inscribete → inscripción con mes de prueba · /terminos → Términos del servicio
import Escena from "./src/Escena.jsx";
import Carrusel from "./src/Carrusel.jsx";
import PaginaPlanes from "./src/planes/PaginaPlanes.jsx";
import Inscripcion from "./src/planes/Inscripcion.jsx";
import Terminos from "./src/planes/Terminos.jsx";
import { MARCA, esPlanes } from "./src/marca.js";

document.body.classList.add(`cv-marca-${MARCA}`);

const modo = new URLSearchParams(window.location.search).get("modo");

export default function App() {
  if (esPlanes) {                            // planes.hipokratia.health
    const ruta = window.location.pathname.replace(/\/+$/, "");
    if (ruta === "/inscribete") return <Inscripcion />;
    if (ruta === "/terminos") return <Terminos />;
    return <PaginaPlanes />;
  }
  if (modo === "carrusel") {
    document.body.classList.add("cv-modo-carrusel");
    return <Carrusel />;
  }
  document.body.classList.add("cv-modo-escena");
  return <Escena esperarInicio />;
}
