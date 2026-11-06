// planes/PaginaPlanes.jsx — planes.hipokratia.health
// Planes y precios de HypokratIA Gestión con los valores VIGENTES (Superadmin → Precios,
// vía GET /api/planes/precios), calculadora para un centro y el video de los avatares
// (la misma Escena de conoce.hipokratia.health, con el guion armado con esos precios).
import { useEffect, useMemo, useState } from "react";
import Escena from "../Escena.jsx";
import PantallaPlanes from "./PantallasPlanes.jsx";
import { guionPlanes } from "./guionPlanes.js";
import { cargarPrecios, pesos } from "./precios.js";
import "./planes.css";

const CORREO = "contacto@hipokratia.health";

function Check({ children }) {
  return <li><span aria-hidden="true">✓</span>{children}</li>;
}

export default function PaginaPlanes() {
  const [precios, setPrecios] = useState(undefined);   // undefined: cargando · null: no cargó
  const [video, setVideo] = useState(false);
  const [cantidades, setCantidades] = useState({});

  useEffect(() => { cargarPrecios().then(setPrecios); }, []);

  const guion = useMemo(() => (precios ? guionPlanes(precios) : null), [precios]);
  const total = (precios?.centro || []).reduce((s, r) => s + r.precio * (cantidades[r.rol] || 0), 0);
  const usuarios = Object.values(cantidades).reduce((s, n) => s + n, 0);

  function cambiar(rol, d) {
    setCantidades((c) => ({ ...c, [rol]: Math.max(0, Math.min(99, (c[rol] || 0) + d)) }));
  }

  function correo(plan) {
    let cuerpo = `Hola, me interesa el plan ${plan} de HypokratIA Gestión.`;
    if (plan === "Centro" && usuarios > 0) {
      const detalle = precios.centro.filter((r) => cantidades[r.rol]).map((r) => `- ${r.nombre}: ${cantidades[r.rol]}`).join("\n");
      cuerpo += `\n\nMi equipo:\n${detalle}\nTotal estimado: ${pesos(total)} al mes.`;
    }
    cuerpo += "\n\nNombre:\nCentro o especialidad:\nTeléfono:";
    return `mailto:${CORREO}?subject=${encodeURIComponent(`Plan ${plan} · HypokratIA Gestión`)}&body=${encodeURIComponent(cuerpo)}`;
  }

  return (
    <div className="pl">
      <header className="pl-cab">
        <div className="pl-ancho">
          <a className="pl-marca" href="https://hipokratia.health">
            <img src="/logo.png" alt="" width="34" height="34" />
            <span>Hypokrat<b>IA</b> Gestión</span>
          </a>
          <h1>Planes y precios</h1>
          <p className="pl-sub">Ficha clínica, agenda, dictado con IA y el Portal para tus pacientes. Precios mensuales, <b>IVA incluido</b>.
            {" "}Si trabajas solo, <a className="pl-sub-link" href="/inscribete">pruébalo un mes gratis, sin tarjeta</a>.</p>
          {guion && (
            <button className="pl-video" onClick={() => setVideo(true)}>
              <span aria-hidden="true">▶</span> Ver a los asistentes explicando los planes
            </button>
          )}
        </div>
      </header>

      <main className="pl-ancho">
        {precios === undefined && <p className="pl-aviso">Cargando precios…</p>}
        {precios === null && (
          <p className="pl-aviso">No pudimos cargar los precios en este momento. Escríbenos a <a href={`mailto:${CORREO}`}>{CORREO}</a> y te los enviamos.</p>
        )}

        {precios && (
          <>
            <section className="pl-planes" aria-label="Planes">
              <article className="pl-plan">
                <p className="pl-plan__tipo">1 profesional</p>
                <h2>Externo Base</h2>
                <p className="pl-precio">{pesos(precios.externo_base)}<span>/mes</span></p>
                <ul>
                  <Check>Ficha clínica electrónica</Check>
                  <Check>Agenda y bloqueos</Check>
                  <Check>Recetas, órdenes e informes para imprimir</Check>
                  <Check>Dictado con IA que ordena la atención</Check>
                  <Check>Portal y app para tus pacientes</Check>
                </ul>
                <a className="pl-boton pl-boton--suave" href="/inscribete?plan=externo_base">Probar 1 mes gratis</a>
              </article>

              <article className="pl-plan pl-plan--destacado">
                <p className="pl-etiqueta">Más visibilidad</p>
                <p className="pl-plan__tipo">1 profesional</p>
                <h2>Externo Completo</h2>
                <p className="pl-precio">{pesos(precios.externo_completo)}<span>/mes</span></p>
                <ul>
                  <Check><b>Todo lo del Base</b></Check>
                  <Check>Tu propia página de reservas</Check>
                  <Check>Apareces en "Agendar hora" del Portal HypokratIA</Check>
                  <Check>Tus direcciones de atención</Check>
                  <Check>Logo y nombre en tus documentos</Check>
                </ul>
                <a className="pl-boton" href="/inscribete?plan=externo_completo">Probar 1 mes gratis</a>
              </article>

              <article className="pl-plan">
                <p className="pl-plan__tipo">Equipo</p>
                <h2>Centro</h2>
                <p className="pl-precio pl-precio--chico">Por usuario<span>/mes</span></p>
                <ul className="pl-roles">
                  {precios.centro.map((r) => <li key={r.rol}><span>{r.nombre}</span><b>{pesos(r.precio)}</b></li>)}
                </ul>
                <p className="pl-nota">Incluye página de reservas, caja, equipo, remuneraciones y Portal para tus pacientes.</p>
                <a className="pl-boton pl-boton--suave" href="#calculadora">Calcular mi centro</a>
              </article>
            </section>

            <section id="calculadora" className="pl-calc">
              <h2>Calcula tu centro</h2>
              <p className="pl-sub2">Elige cuántos usuarios de cada tipo tiene tu equipo.</p>
              <div className="pl-calc__filas">
                {precios.centro.map((r) => (
                  <div key={r.rol} className="pl-calc__fila">
                    <span className="pl-calc__nombre">{r.nombre}<small>{pesos(r.precio)} c/u</small></span>
                    <div className="pl-calc__ctrl">
                      <button onClick={() => cambiar(r.rol, -1)} disabled={!cantidades[r.rol]} aria-label={`Quitar ${r.nombre}`}>−</button>
                      <output aria-live="polite">{cantidades[r.rol] || 0}</output>
                      <button onClick={() => cambiar(r.rol, 1)} aria-label={`Agregar ${r.nombre}`}>+</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pl-calc__total">
                <span>{usuarios} {usuarios === 1 ? "usuario" : "usuarios"}</span>
                <b>{pesos(total)}<small>/mes</small></b>
              </div>
              <a className={`pl-boton${usuarios ? "" : " pl-boton--off"}`} href={usuarios ? correo("Centro") : undefined}
                 aria-disabled={!usuarios}>Quiero este plan</a>
            </section>

            <section className="pl-extra">
              <div>
                <h3>Incluido en todos los planes</h3>
                <ul>
                  <Check>Portal HypokratIA y app: ficha, recordatorios de medicamentos, cuidadores y cotizador de recetas</Check>
                  <Check>Profesionales verificados en el registro de la Superintendencia de Salud</Check>
                  <Check>Cumple la Ley 20.584 (derechos del paciente) y la Ley 21.719 (datos personales)</Check>
                </ul>
              </div>
              <div>
                <h3>Módulos adicionales <span>a cotizar</span></h3>
                <ul>
                  <Check>Atención a domicilio con seguimiento en el mapa</Check>
                  <Check>Telemedicina</Check>
                  <Check>Dermatología en línea</Check>
                </ul>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="pl-pie">
        <div className="pl-ancho">
          <span>Hypokrat<b>IA</b> · <a href="https://hipokratia.health">hipokratia.health</a> · <a href={`mailto:${CORREO}`}>{CORREO}</a></span>
          <span>Precios mensuales en pesos chilenos, IVA incluido · <a href="/terminos">Términos del servicio</a></span>
        </div>
      </footer>

      {video && guion && (
        <Escena guion={guion} Pantalla={PantallaPlanes} datos={precios} alCerrar={() => setVideo(false)} />
      )}
    </div>
  );
}
