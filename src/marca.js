// marca.js — qué video se muestra, según la dirección:
//   conoce.hipokratia.health → HypokratIA (vende el sistema a pacientes y centros)
//   conoce.icarticular.cl    → Instituto de Cirugía Articular (el centro y sus pacientes)
//   planes.hipokratia.health → planes y precios de HypokratIA Gestión (marca HypokratIA)
// ica.html marca data-marca="ica" y planes.html data-marca="planes"; en local: ?marca=ica | ?marca=planes
import insigniaHipokratia from "./assets/hipokratia-insignia.png";
import insigniaIca from "./assets/ica-insignia.jpg";

function detectar() {
  try {
    const q = new URLSearchParams(window.location.search).get("marca");
    if (q === "ica" || q === "hipokratia" || q === "planes") return q;
  } catch { /* sin URL */ }
  if (document.documentElement.dataset.marca === "ica") return "ica";
  if (document.documentElement.dataset.marca === "planes" || /^planes\./i.test(window.location.hostname)) return "planes";
  return /icarticular\.cl$/i.test(window.location.hostname) ? "ica" : "hipokratia";
}

export const MARCA = detectar();
export const esICA = MARCA === "ica";
export const esPlanes = MARCA === "planes";

/** Logo de la insignia del pecho de Ica, Ipo y Sophia */
export const logoInsignia = esICA ? insigniaIca : insigniaHipokratia;

/** Textos de la franja del carrusel */
export const FRANJA = esICA
  ? { titulo: "Conoce a nuestros asistentes", texto: "Ica, Ipo, Sophia y Katia te acompañan antes, durante y después de tu consulta. Toca a uno y te cuentan cómo." }
  : { titulo: "Conoce a nuestros asistentes", texto: "Ica, Ipo, Sophia y Katia acompañan a pacientes y equipos. Toca a uno y te cuentan cómo trabajan." };
