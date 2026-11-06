// planes/Inscripcion.jsx — planes.hipokratia.health/inscribete
// Inscripción automática con un mes de prueba sin tarjeta (Externo Base o Completo).
// El backend (POST /api/inscripcion) confirma el correo con un código, verifica en el
// RNPI y, si está, crea la cuenta al tiro; si no, queda para revisión del superadmin.
import { useEffect, useState } from "react";
import { BACKEND, cargarPrecios, pesos } from "./precios.js";

const PROFESIONES = [
  { rol: "medico", nombre: "Médico/a", tratos: ["Dr.", "Dra."] },
  { rol: "odontologo", nombre: "Odontólogo/a", tratos: ["Dr.", "Dra."] },
  { rol: "psicologo", nombre: "Psicólogo/a", tratos: ["Ps."] },
  { rol: "kine", nombre: "Kinesiólogo/a", tratos: ["Klgo.", "Klga."] },
  { rol: "enfermera", nombre: "Enfermero/a", tratos: ["E.U."] },
  { rol: "terapeuta", nombre: "Terapeuta ocupacional", tratos: ["T.O."] },
  { rol: "nutricionista", nombre: "Nutricionista", tratos: ["Nut."] },
  { rol: "fonoaudiologo", nombre: "Fonoaudiólogo/a", tratos: ["Flgo.", "Flga."] },
];

async function post(ruta, cuerpo) {
  const r = await fetch(`${BACKEND}${ruta}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cuerpo),
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(typeof d.detail === "string" ? d.detail : "No se pudo completar. Intenta de nuevo.");
  return d;
}

const fecha = (iso) => (iso ? iso.slice(0, 10).split("-").reverse().join("/") : "");

export default function Inscripcion() {
  const inicial = new URLSearchParams(window.location.search).get("plan");
  const [precios, setPrecios] = useState(null);
  const [especialidades, setEspecialidades] = useState({});
  const [comunas, setComunas] = useState([]);
  const [f, setF] = useState({
    plan: inicial === "externo_base" ? "externo_base" : "externo_completo",
    rol: "medico", trato: "Dr.", nombre: "", apellido: "", rut: "", especialidad: "",
    telefono: "", email: "", codigo: "", calle: "", numero: "", depto: "", comuna: "", acepta: false,
    domicilio: false, pagoOnline: false,
  });
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    cargarPrecios().then(setPrecios);
    fetch(`${BACKEND}/api/especialidades`).then((r) => (r.ok ? r.json() : {})).then(setEspecialidades).catch(() => {});
    fetch(`${BACKEND}/geo/comunas`).then((r) => (r.ok ? r.json() : [])).then(setComunas).catch(() => {});
  }, []);

  const cambiar = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const profesion = PROFESIONES.find((p) => p.rol === f.rol);
  const completo = f.plan === "externo_completo";
  const dermato = /dermatolog/i.test(f.especialidad.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
  const total = precios ? precios[f.plan] + (completo && f.domicilio ? precios.domicilio_adicional || 0 : 0) : 0;

  function elegirProfesion(e) {
    const p = PROFESIONES.find((x) => x.rol === e.target.value);
    setF((x) => ({ ...x, rol: p.rol, trato: p.tratos[0], especialidad: "" }));
  }

  async function pedirCodigo() {
    setError(""); setAviso("");
    if (!/^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/.test(f.email.trim())) { setError("Escribe un correo válido."); return; }
    setEnviando(true);
    try {
      await post("/api/inscripcion/codigo", { email: f.email.trim() });
      setCodigoEnviado(true);
      setAviso(`Te enviamos un código a ${f.email.trim()}. Revisa también spam.`);
    } catch (e) { setError(e.message); }
    finally { setEnviando(false); }
  }

  async function enviar(e) {
    e.preventDefault();
    setError(""); setAviso("");
    if (!codigoEnviado) { setError("Primero pide el código para confirmar tu correo."); return; }
    if (!f.acepta) { setError("Debes aceptar los Términos del servicio."); return; }
    setEnviando(true);
    try {
      const d = await post("/api/inscripcion", {
        plan: f.plan, rol: f.rol, trato: f.trato, nombre: f.nombre, apellido: f.apellido, rut: f.rut,
        especialidad: f.especialidad, telefono: f.telefono, email: f.email.trim(), codigo: f.codigo.trim(),
        acepta_terminos: true, domicilio: completo && f.domicilio, interes_pago_online: f.pagoOnline,
        direccion: completo ? { calle: f.calle, numero: f.numero, depto: f.depto, comuna: f.comuna } : null,
      });
      setResultado(d);
      window.scrollTo(0, 0);
    } catch (e) { setError(e.message); }
    finally { setEnviando(false); }
  }

  return (
    <div className="pl">
      <header className="pl-cab pl-cab--corta">
        <div className="pl-ancho">
          <a className="pl-marca" href="/">
            <img src="/logo.png" alt="" width="34" height="34" />
            <span>Hypokrat<b>IA</b> Gestión</span>
          </a>
          <h1>Prueba un mes gratis</h1>
          <p className="pl-sub">Sin tarjeta. Si estás en el registro de la Superintendencia de Salud, tu cuenta queda lista al tiro.</p>
        </div>
      </header>

      <main className="pl-ancho pl-form-cont">
        {resultado?.estado === "activa" && (
          <section className="pl-tarjeta pl-ok" aria-live="polite">
            <h2>¡Listo! Tu mes de prueba comenzó</h2>
            <p>Te enviamos el usuario y la contraseña a <b>{f.email.trim()}</b>.</p>
            <p>Tu usuario: <b>{resultado.usuario}</b> · Prueba hasta el <b>{fecha(resultado.vence)}</b>.</p>
            {resultado.pagina && (
              <p>Tu página de reservas: <a href={resultado.pagina}>{resultado.pagina.replace("https://", "")}</a> (puede tardar unos minutos en quedar en línea).</p>
            )}
            <p className="pl-nota">Antes de que termine la prueba te enviaremos el link para pagar. Si no se paga, la cuenta se anula.</p>
          </section>
        )}

        {resultado?.estado === "pendiente" && (
          <section className="pl-tarjeta pl-pend" aria-live="polite">
            <h2>Recibimos tu inscripción</h2>
            <p>No pudimos verificarte automáticamente en el registro de prestadores ({resultado.motivo}).
              La revisaremos y te responderemos a <b>{f.email.trim()}</b>, normalmente en menos de un día hábil.</p>
          </section>
        )}

        {!resultado && (
          <form className="pl-tarjeta pl-form" onSubmit={enviar} noValidate>
            <fieldset className="pl-planes-elegir">
              <legend>Plan</legend>
              {[["externo_completo", "Externo Completo", "Con tu página de reservas"], ["externo_base", "Externo Base", "Ficha, agenda y documentos"]].map(([v, n, d]) => (
                <label key={v} className={`pl-opcion${f.plan === v ? " pl-opcion--on" : ""}`}>
                  <input type="radio" name="plan" value={v} checked={f.plan === v} onChange={cambiar("plan")} />
                  <span><b>{n}</b><small>{d}</small></span>
                  {precios && <em>{pesos(precios[v])}/mes después del mes gratis</em>}
                </label>
              ))}
            </fieldset>

            <div className="pl-campos">
              <label>Profesión
                <select value={f.rol} onChange={elegirProfesion}>
                  {PROFESIONES.map((p) => <option key={p.rol} value={p.rol}>{p.nombre}</option>)}
                </select>
              </label>
              <label>Trato
                <select value={f.trato} onChange={cambiar("trato")}>
                  {profesion.tratos.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label>Nombre<input value={f.nombre} onChange={cambiar("nombre")} autoComplete="given-name" required /></label>
              <label>Apellido<input value={f.apellido} onChange={cambiar("apellido")} autoComplete="family-name" required /></label>
              <label>RUT<input value={f.rut} onChange={cambiar("rut")} placeholder="12.345.678-9" required /></label>
              <label>Especialidad
                <select value={f.especialidad} onChange={cambiar("especialidad")}>
                  <option value="">General</option>
                  {(especialidades[f.rol] || []).map((e) => <option key={e}>{e}</option>)}
                </select>
              </label>
              <label>Teléfono<input value={f.telefono} onChange={cambiar("telefono")} type="tel" autoComplete="tel" placeholder="+56 9 1234 5678" required /></label>
            </div>

            {completo && (
              <div className="pl-campos">
                <p className="pl-subt">Dirección donde atiendes (aparece en tu página)</p>
                <label>Calle<input value={f.calle} onChange={cambiar("calle")} required /></label>
                <label>Número<input value={f.numero} onChange={cambiar("numero")} /></label>
                <label>Oficina / depto<input value={f.depto} onChange={cambiar("depto")} /></label>
                <label>Comuna
                  <input value={f.comuna} onChange={cambiar("comuna")} list="pl-comunas" required />
                  <datalist id="pl-comunas">{comunas.map((c) => <option key={c.comuna} value={c.comuna}>{c.region}</option>)}</datalist>
                </label>
              </div>
            )}

            <div className="pl-servicios">
              <p className="pl-subt">Servicios</p>
              {completo && (
                <label className="pl-check">
                  <input type="checkbox" checked={f.domicilio} onChange={cambiar("domicilio")} />
                  <span>Atiendo a domicilio{precios?.domicilio_adicional ? <> (<b>+{pesos(precios.domicilio_adicional)}/mes</b>)</> : ""}.
                    {" "}Tus pacientes podrán pedir atención a domicilio desde tu página.</span>
                </label>
              )}
              {completo && dermato && (
                <p className="pl-incluido">✓ Dermatología online incluida sin costo (si el registro de prestadores confirma tu especialidad).</p>
              )}
              <label className="pl-check">
                <input type="checkbox" checked={f.pagoOnline} onChange={cambiar("pagoOnline")} />
                <span>Me interesa que mis pacientes me paguen en línea (aún no disponible: nos ayuda a saber si lo implementamos).</span>
              </label>
              {precios && <p className="pl-nota pl-total">Después del mes gratis: <b>{pesos(total)}/mes</b> (IVA incluido).</p>}
            </div>

            <div className="pl-campos">
              <label className="pl-ancho2">Correo
                <span className="pl-fila">
                  <input value={f.email} onChange={(e) => { cambiar("email")(e); setCodigoEnviado(false); }} type="email" autoComplete="email" required />
                  <button type="button" className="pl-boton pl-boton--suave" onClick={pedirCodigo} disabled={enviando}>
                    {codigoEnviado ? "Reenviar código" : "Enviar código"}
                  </button>
                </span>
              </label>
              {codigoEnviado && (
                <label>Código del correo<input value={f.codigo} onChange={cambiar("codigo")} inputMode="numeric" maxLength={6} autoComplete="one-time-code" required /></label>
              )}
            </div>

            <label className="pl-check">
              <input type="checkbox" checked={f.acepta} onChange={cambiar("acepta")} />
              <span>Acepto los <a href="/terminos" target="_blank" rel="noreferrer">Términos del servicio</a> y la
                {" "}<a href="https://portal.hipokratia.health/privacidad" target="_blank" rel="noreferrer">Política de privacidad</a>.</span>
            </label>

            {aviso && <p className="pl-msg" role="status">{aviso}</p>}
            {error && <p className="pl-msg pl-msg--error" role="alert">{error}</p>}

            <button className="pl-boton" type="submit" disabled={enviando}>{enviando ? "Un momento…" : "Comenzar mi mes gratis"}</button>
            <p className="pl-nota">Una prueba por profesional. Al terminar el mes, si no pagas, la cuenta se anula (las fichas clínicas se conservan, como exige la ley).</p>
          </form>
        )}
      </main>
    </div>
  );
}
