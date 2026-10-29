// Carrusel.jsx — conoce.hipokratia.health/?modo=carrusel
// Los 4 asistentes pasando, para mostrarse dentro de la página principal de
// hipokratia.health (en un iframe). Al tocar uno, ESTE mismo marco se agranda a
// pantalla completa con la escena (así el audio queda permitido por el toque) y
// al cerrar vuelve a su tamaño. Mensajes a la página que lo muestra:
//   { fuente: "hipokratia-conversa", tipo: "alto", alto }   alto del carrusel
//   { fuente: "hipokratia-conversa", tipo: "expandir" }      pasar a pantalla completa
//   { fuente: "hipokratia-conversa", tipo: "contraer" }      volver al carrusel
import { useEffect, useRef, useState } from "react";
import Escena, { AVATARES, ORDEN } from "./Escena.jsx";
import { GUION, inicioDe } from "./guion.js";
import { precargar } from "./voz.js";
import { FRANJA } from "./marca.js";

// Solo se avisa a los sitios propios
const PADRES = /^https:\/\/([a-z0-9-]+\.)*(hipokratia\.health|icarticular\.cl)$/;
function avisar(mensaje) {
  if (window.parent === window) return;
  let origen = "";
  try { origen = new URL(document.referrer).origin; } catch { /* sin referrer */ }
  const destino = PADRES.test(origen) || /^http:\/\/localhost(:\d+)?$/.test(origen) ? origen : null;
  if (destino) window.parent.postMessage({ fuente: "hipokratia-conversa", ...mensaje }, destino);
}

export default function Carrusel() {
  const [destacado, setDestacado] = useState(0);
  const [abierta, setAbierta] = useState(null);   // índice del guion donde parte, o null
  const [pausa, setPausa] = useState(false);
  const raiz = useRef(null);
  const pista = useRef(null);

  // Apenas se ve: despierta al servidor de voz y pide el primer audio de cada asistente
  useEffect(() => {
    precargar([0, ...ORDEN.map(inicioDe)].filter((v, i, a) => a.indexOf(v) === i).map((i) => GUION[i]), { despertar: true });
  }, []);

  // La página principal ajusta el alto del marco a lo que mide el carrusel
  useEffect(() => {
    if (!raiz.current || abierta !== null) return undefined;
    const medir = () => avisar({ tipo: "alto", alto: Math.ceil(raiz.current.getBoundingClientRect().height) });
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(raiz.current);
    return () => ro.disconnect();
  }, [abierta]);

  useEffect(() => {
    if (pausa || abierta !== null) return undefined;
    const t = setInterval(() => setDestacado((d) => (d + 1) % ORDEN.length), 3200);
    return () => clearInterval(t);
  }, [pausa, abierta]);

  useEffect(() => {
    const el = pista.current?.children[destacado];
    if (!el || !pista.current || pista.current.scrollWidth <= pista.current.clientWidth + 4) return;
    pista.current.scrollTo({ left: el.offsetLeft - (pista.current.clientWidth - el.clientWidth) / 2, behavior: "smooth" });
  }, [destacado]);

  function abrir(desde) { avisar({ tipo: "expandir" }); setAbierta(desde); }
  function cerrar() { setAbierta(null); avisar({ tipo: "contraer" }); }

  if (abierta !== null) return <Escena desde={abierta} alCerrar={cerrar} />;

  return (
    <section ref={raiz} className="cv-franja" aria-labelledby="t-asistentes">
      <div className="cv-franja__cabeza">
        <div>
          <h2 id="t-asistentes">{FRANJA.titulo}</h2>
          <p>{FRANJA.texto}</p>
        </div>
        <button className="cv-ver" onClick={() => abrir(0)}>
          <span className="cv-ver__largo">▶ Verlos conversar</span><span className="cv-ver__corto">▶ Ver</span>
        </button>
      </div>

      <div
        ref={pista}
        className="cv-pista"
        onPointerEnter={() => setPausa(true)}
        onPointerLeave={() => setPausa(false)}
        onTouchStart={() => setPausa(true)}
      >
        {ORDEN.map((k, i) => {
          const a = AVATARES[k];
          const on = i === destacado;
          return (
            <button
              key={k}
              className={`cv-tarjeta${on ? " cv-tarjeta--on" : ""}`}
              onClick={() => abrir(inicioDe(k))}
              onFocus={() => setDestacado(i)}
              aria-label={`${a.nombre}, ${a.rol}. Ver la presentación`}
            >
              <span className="cv-tarjeta__globo" aria-hidden="true">{a.frase}</span>
              <span className="cv-tarjeta__cara"><a.Comp estado={on ? "hablando" : "reposo"} boca={0} /></span>
              <span className="cv-tarjeta__nombre">{a.nombre}</span>
              <span className="cv-tarjeta__rol">{a.rol}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
